import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Countries } from './countries.model';
import { CountriesFilms } from './countries.m2m.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UpdateCountryDto } from '@shared/dto';
import { CountriesUpdateInterface, HttpRpcException } from '@shared';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Countries) private countriesRepository: typeof Countries,
    @InjectModel(CountriesFilms)
    private countriesFilmsRepository: typeof CountriesFilms,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCountryById(countryId: number): Promise<any> {
    const cache = await this.cacheManager.get(
      `getCountryById${JSON.stringify(countryId)}`,
    );
    if (cache) {
      return cache;
    }
    return await this.countriesRepository
      .findOne({ where: { id: countryId } })
      .then(async (result) => {
        if (!result) {
          throw new HttpRpcException(
            'Такой айди не зарегистрирован',
            HttpStatus.BAD_REQUEST,
          );
        }
        await this.cacheManager.set(
          `getCountryById${JSON.stringify(countryId)}`,
          result,
        );
        return result;
      });
  }

  async getAllCountries(): Promise<any> {
    const cache = await this.cacheManager.get(`getAllCountries`);
    if (cache) {
      return cache;
    }
    return await this.countriesRepository
      .findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      })
      .then(async (result) => {
        if (!result) {
          throw new HttpRpcException(
            'Что то пошло не так',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        await this.cacheManager.set(`getAllCountries`, result);
        return result;
      });
  }

  async updateCountryById(country: CountriesUpdateInterface): Promise<any> {
    const countryDto: UpdateCountryDto = country.country;
    const currentCountry = await this.countriesRepository.findOne({
      where: { id: country.id },
    });
    if (!currentCountry) {
      throw new HttpRpcException(
        'Не нашлось страны по данному айди',
        HttpStatus.BAD_REQUEST,
      );
    }
    await currentCountry.update(countryDto);
    return currentCountry;
  }

  async deleteCountryById(countryId: number) {
    return await this.countriesRepository
      .destroy({
        where: { id: countryId },
      })
      .then((result) => {
        if (result) return [];
        throw new HttpRpcException(
          'такой айди не существует',
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
