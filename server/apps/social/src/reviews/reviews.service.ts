import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpRpcException, ReviewModelAttrs } from '@shared';
import { CreateReviewDto, PaginationQueryDto } from '@shared/dto';
import { ReviewTreeDto } from '@shared/dto';
import { FindOptions, Op, WhereOptions } from 'sequelize';
import { Profile } from '../../models/profiles.model';
import { Review } from '../../models/reviews.model';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewsRepository: typeof Review) {}

  async createReview(dto: CreateReviewDto, userId: number) {
    const { parentId } = dto;
    let parentPath = ''; // parentPath по умолчанию
    let parentDepth = 0;
    let parent: Review = undefined;

    if (parentId !== undefined) {
      parent = await this.reviewsRepository.findByPk(parentId);
      if (!parent) {
        throw new HttpRpcException(
          `Отзыв с parentId = ${parentId} не найден`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (dto.filmId !== undefined && parent.filmId !== dto.filmId) {
        throw new HttpRpcException(
          `filmId родительского отзыва должен совпадать с filmId текущего отзыва, если последний задан`,
          HttpStatus.BAD_REQUEST,
        );
      }

      parentPath = parent.path + parent.id + '.';
      parentDepth = parent.depth + 1;
    }

    const review = await this.reviewsRepository.create({
      profileId: userId,
      ...dto,
      path: parentPath,
      childsNum: 0,
      depth: parentDepth,
    });

    if (parent) {
      parent.set('childsNum', parent.childsNum + 1);
      await parent.save();
    }

    return review;
  }

  async getReviewByReviewIdSingle(reviewId: number) {
    const review = await this.reviewsRepository.findByPk(reviewId, {
      include: {
        model: Profile,
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['profileId'],
      },
    });
    if (!review) {
      throw new HttpRpcException('Отзыв не найден', HttpStatus.NOT_FOUND);
    }
    return review;
  }

  private async collapseTree(reviews: Review[], findOne = false) {
    let i = 0;
    const roots = [];
    const reviewStack = [];

    if (!reviews.length) return [];

    const rootPath = reviews[0].path;
    while (i < reviews.length) {
      if (rootPath !== reviews[i].path) break;
      const review = new ReviewTreeDto(reviews[i]);
      roots.push(review);
      reviewStack.push(review);
      i += 1;
    }

    reviewStack.reverse();

    while (true) {
      if (i === reviews.length) break;
      const review = new ReviewTreeDto(reviews[i]);

      if (reviewStack[reviewStack.length - 1].id === review.parentId) {
        reviewStack[reviewStack.length - 1].childs.push(review);
        i += 1;
      } else {
        const fullParent = reviewStack.pop();
        for (let j = fullParent.childs.length - 1; j >= 0; j--) {
          reviewStack.push(fullParent.childs[j]);
        }
        while (reviewStack[reviewStack.length - 1].id !== review.parentId) {
          reviewStack.pop();
        }
      }
    }

    if (findOne) return roots[0];
    return roots;
  }

  async getReviewByReviewIdTree(reviewId: number, depth: number) {
    const parentReview = await this.reviewsRepository.findByPk(reviewId, {
      include: {
        model: Profile,
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['profileId'],
      },
    });

    if (!parentReview) {
      throw new HttpRpcException('Отзыв не найден', HttpStatus.NOT_FOUND);
    }

    const pathToStart = `${parentReview.path}${reviewId}.`;
    console.log(pathToStart);

    const whereOptions: WhereOptions<ReviewModelAttrs> = {
      path: {
        [Op.startsWith]: pathToStart,
      },
      filmId: parentReview.filmId,
    };

    if (depth !== undefined) {
      whereOptions.depth = {
        [Op.lte]: parentReview.depth + +depth,
      };
    }

    const reviews = await this.reviewsRepository.findAll({
      where: whereOptions,
      include: {
        model: Profile,
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['profileId'],
      },
      order: [
        ['path', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });

    return this.collapseTree([parentReview, ...reviews], true);
  }

  async getReviewsByFilmId(filmId: number, depth?: number) {
    const whereOptions: WhereOptions<ReviewModelAttrs> = {
      filmId: filmId,
    };

    if (depth !== undefined) {
      whereOptions.depth = {
        [Op.lte]: depth,
      };
    }

    const reviews = await this.reviewsRepository.findAll({
      where: whereOptions,
      include: {
        model: Profile,
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['profileId'],
      },
      order: [
        ['path', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
    return this.collapseTree(reviews);
  }

  async getTopReviewsByFilmId(
    filmId: number,
    paginationQueryDto: PaginationQueryDto,
  ) {
    const { size, page } = paginationQueryDto;

    const findOptions: FindOptions<ReviewModelAttrs> = {
      where: {
        filmId: filmId,
        depth: 0,
      },
      include: {
        model: Profile,
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
      },
      attributes: {
        exclude: ['profileId'],
      },
      order: [
        ['path', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    };

    if (size) {
      findOptions.limit = size;
      if (page === undefined) findOptions.offset = 0;
      findOptions.offset = page * size;
    }

    const reviews = await this.reviewsRepository.findAndCountAll(findOptions);
    return reviews;
  }

  async getReviewsByProfileId(profileId: number) {
    return this.reviewsRepository.findAll({
      where: {
        profileId,
      },
      include: [
        { model: Review },
        { model: Profile, attributes: ['id', 'username'] },
      ],
    });
  }

  async deleteReviewByReviewId(reviewId: number) {
    const parent = await this.reviewsRepository.findByPk(reviewId);
    if (!parent) return [];

    if (parent.parentId !== null) {
      const grandParent = await this.reviewsRepository.findByPk(
        parent.parentId,
      );

      grandParent.set('childsNum', grandParent.childsNum - 1);
      await grandParent.save();
    }

    const childs = await this.reviewsRepository.findAll({
      where: {
        path: {
          [Op.startsWith]: parent.path + parent.id + '.',
        },
        filmId: parent.filmId,
      },
      attributes: ['id'],
    });

    for (let i = 0; i < childs.length; i++) {
      await childs[i].destroy();
    }

    await parent.destroy();

    return [];
  }
}
