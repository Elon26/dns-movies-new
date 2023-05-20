import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getLang } from "../../../../store/switchLang";
import { IGenreObject } from "../../../../models";
import styles from "./genresChangeItem.module.scss";
import MyButton from "../../../../components/common/MyButton/MyButton";
import { FormattedMessage } from "react-intl";
import GenresChangePopup from "../GenresChangePopup/GenresChangePopup";

interface GenresChangeItemProps {
    genre: IGenreObject;
}

/** Компонент жанра для админ-панели. */
const GenresChangeItem = ({
    genre
}: GenresChangeItemProps): React.ReactElement => {
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
                    {lang === "Ru" ? genre.genreNameRu : genre.genreNameEng}
                </div>
                <MyButton type="gradient" size="medium" onClick={openPopap}>
                    <FormattedMessage id="Change" />
                </MyButton>
            </div>

            {isPopapOpen && (
                <GenresChangePopup
                    genre={genre}
                    handleClosePopup={closePopup}
                    isPopapOpen={isPopapOpen}
                />
            )}
        </>
    );
};

export default GenresChangeItem;
