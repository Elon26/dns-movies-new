import React from "react";
import styles from "./filmCardsField.module.scss";
import { FormattedMessage } from "react-intl";
import { IMovieFromMoviesList } from "../../../../models";
import FilmCard from "./FilmCard";

interface FilmCardsFieldProps {
    filmCards: IMovieFromMoviesList[];
    getMoreFilmcards(): void;
    isLastPage: boolean;
}

/** Компонент c карточками фильмов */
const FilmCardsField = ({
    filmCards,
    getMoreFilmcards,
    isLastPage
}: FilmCardsFieldProps): React.ReactElement => {
    return (
        <div className={styles.wrapper}>
            {filmCards.map((filmData) => (
                <FilmCard
                    key={
                        filmData.kinopoiskId.toString() +
                        Math.random().toString()
                    }
                    filmData={filmData}
                />
            ))}
            {!isLastPage && (
                <div
                    className={styles.moreButton}
                    onClick={getMoreFilmcards}
                    data-testid="showMoreButtonFromMoviesPage"
                >
                    <FormattedMessage id="ShowMore" />
                </div>
            )}
        </div>
    );
};

export default FilmCardsField;
