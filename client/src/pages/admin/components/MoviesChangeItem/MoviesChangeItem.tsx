import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getLang } from "../../../../store/switchLang";
import { IMovieFromMoviesList } from "../../../../models";
import styles from "./moviesChangeItem.module.scss";
import MyButton from "../../../../components/common/MyButton/MyButton";
import { FormattedMessage } from "react-intl";
import MoviesChangePopup from "../MoviesChangePopup/MoviesChangePopup";

interface MoviesChangeItemProps {
    filmCard: IMovieFromMoviesList;
    changeFilmList(filmCard: IMovieFromMoviesList): void;
}

/** Компонент фильма для админ-панели. */
const MoviesChangeItem = ({
    filmCard,
    changeFilmList
}: MoviesChangeItemProps): React.ReactElement => {
    const lang = useSelector(getLang());
    const [isPopapOpen, setIsPopapOpen] = useState(false);

    /** Функция открывает всплывающее окно и блокирует прокрутку основной страницы. */
    function openPopap(): void {
        setIsPopapOpen(true);
        document.body.style.overflow = "hidden";
    }

    /** Функция закрывает всплывающее окно и разблокирует прокрутку основной страницы. */
    function closePopup(): void {
        setIsPopapOpen(false);
        document.body.style.overflow = "visible";
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.textItem}>
                    {lang === "Ru"
                        ? filmCard.nameRu
                        : filmCard.nameOriginal
                        ? filmCard.nameOriginal
                        : filmCard.nameRu}
                </div>
                <MyButton type="gradient" size="medium" onClick={openPopap}>
                    <FormattedMessage id="Change" />
                </MyButton>
            </div>

            {isPopapOpen && (
                <MoviesChangePopup
                    filmCard={filmCard}
                    handleClosePopup={closePopup}
                    isPopapOpen={isPopapOpen}
                    changeFilmList={changeFilmList}
                />
            )}
        </>
    );
};

export default MoviesChangeItem;
