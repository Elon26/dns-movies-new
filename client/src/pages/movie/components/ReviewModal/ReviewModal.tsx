import styles from "../Actors/Actors.module.scss";
import style from "./ReviewModal.module.scss";
import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import Carousel from "../../../../components/ui/Carousel/Carousel";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";
import MyButton from "../../../../components/common/MyButton/MyButton";
import { REVIEWLIST_SIZE } from "../../../../components/common/MovieList/constants/constants";
import ReviewList from "../ReviewList/ReviewList";

const ReviewModal: FC<{ callback: () => void }> = ({ callback }) => {
    const router = useRouter();
    const { id } = router.query;
    const film = useSelector(getFilm());

    return (
        <div className={styles.Actors__all}>
            <h1 onClick={() => callback()}>
                <FormattedMessage id="Review" />
            </h1>
            {film?.reviews?.rows?.length ? (
                <div className={style.ReviewModal}>
                    <Carousel
                        href={`/movie/${String(id)}?type=review`}
                        mode={"slider"}
                        carouselId={"reviews"}
                        data={film?.reviews.rows || []}
                        count={40}
                        sizes={REVIEWLIST_SIZE}
                        callback={() => callback()}
                        component={ReviewList}
                    />
                </div>
            ) : (
                <MyButton type="footer" size="large" onClick={callback}>
                    <FormattedMessage id="LeaveAComment" />
                </MyButton>
            )}
        </div>
    );
};

export default ReviewModal;
