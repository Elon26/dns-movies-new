import React from "react";
import styles from "./filmCardsField.module.scss";
import Link from "next/link";
import { BsBookmark, BsTags, BsXCircle, BsStar } from "react-icons/bs";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { IMovieFromMoviesList } from "../../../../models";
import { getLang } from "../../../../store/switchLang";
import IconWithHint from "./IconWithHint";

interface FilmCardProps {
    filmData: IMovieFromMoviesList;
}

/** Компонент c карточкой фильмов */
const FilmCard = ({ filmData }: FilmCardProps): React.ReactElement => {
    const lang = useSelector(getLang());

    if (!filmData || !filmData.kinopoiskId) return <></>;

    return (
        <Link
            className={styles.body}
            href={"/movie/" + filmData.kinopoiskId.toString()}
        >
            <div className={styles.card}>
                <div className={styles.banner}>
                    <img
                        className={styles.img}
                        src={filmData.posterUrl}
                        alt={filmData.nameRu}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.icons}>
                        <IconWithHint
                            text={
                                lang === "Ru" ? "Смотреть позже" : "Watch later"
                            }
                            icon={<BsBookmark />}
                        />
                        <IconWithHint
                            text={lang === "Ru" ? "Похожее" : "Similar"}
                            icon={<BsTags />}
                        />
                        <IconWithHint
                            text={
                                lang === "Ru"
                                    ? "Уже смотрел, оценить"
                                    : "Already watched, rate"
                            }
                            icon={<BsStar />}
                        />
                        <IconWithHint
                            text={
                                lang === "Ru"
                                    ? "Не нравится такое"
                                    : "I don't like this"
                            }
                            icon={<BsXCircle />}
                        />
                    </div>
                    <div className={styles.filmInfos}>
                        <div
                            className={styles.rate}
                            data-testid="filmRateFromMoviesPageCard"
                        >
                            <span>{Math.floor(+filmData.ratingKinopoisk)}</span>
                            <span>,</span>
                            <span>{(+filmData.ratingKinopoisk * 10) % 10}</span>
                        </div>
                        <div
                            className={styles.infos}
                            data-testid="filmInfoFromMoviesPageCard"
                        >
                            {lang === "Ru" &&
                                `${filmData.year}, ${filmData.countries[0].countryNameRu}, ${filmData.genres[0].genreNameRu}`}
                            {lang === "En" &&
                                `${filmData.year}, ${filmData.countries[0].countryNameEng}, ${filmData.genres[0].genreNameEng}`}
                        </div>
                        <div className={styles.duration}>
                            {filmData.filmLength}{" "}
                            {filmData.filmLength && (
                                <FormattedMessage id="Minutes" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={styles.name}
                data-testid="filmNameFromMoviesPageCard"
            >
                {lang === "Ru"
                    ? filmData.nameRu
                    : filmData.nameOriginal
                        ? filmData.nameOriginal
                        : filmData.nameRu}
            </div>
        </Link>
    );
};

export default FilmCard;
