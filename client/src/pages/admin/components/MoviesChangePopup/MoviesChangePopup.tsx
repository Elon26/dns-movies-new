import React, { useEffect, useState } from "react";
import { IMovieFromMoviesList } from "../../../../models";
import styles from "./moviesChangePopup.module.scss";
import { FormattedMessage } from "react-intl";
import { BsXLg } from "react-icons/bs";
import MyButton from "../../../../components/common/MyButton/MyButton";
import { wrapAsyncFunction } from "../../../../utils/wrapAsyncFunction";
import catchError from "../../../../utils/catchError";
import { AxiosError } from "axios";
import { FAKEIVI_ACCESS_TOKEN } from "../../../../constats";
import { axiosAuth } from "../../../../lib/axios";

interface MoviesChangeItemProps {
    filmCard: IMovieFromMoviesList;
    handleClosePopup: () => void;
    isPopapOpen: boolean;
    changeFilmList(filmCard: IMovieFromMoviesList): void;
}

/** Компонент всплывающего окна изменения фильма для админ-панели. */
const MoviesChangePopup = ({
    filmCard,
    handleClosePopup,
    isPopapOpen,
    changeFilmList
}: MoviesChangeItemProps): React.ReactElement => {
    const [currentData, setCurrentData] =
        useState<IMovieFromMoviesList>(filmCard);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /** Функция проверяет, на каком элементе был совершён клик и вызывает закрытие окна, если он был совершён на пустом пространстве или на закрывающей иконке. */
    function handleClick(e: React.MouseEvent<HTMLElement>): void {
        if (e.target instanceof Element) {
            if (
                !e.target.closest(`.${styles.body}`) ||
                e.target.closest(`.${styles.closeIcon}`)
            ) {
                handleClose();
            }
        }
    }

    /** Функция закрывает всплывающее окно с сопутсвующим добавлением эффекта плавного скрытия. */
    function handleClose(): void {
        setIsOpen(false);
        setTimeout(() => {
            handleClosePopup();
        }, 700);
    }

    /** Функция синхронизирует значения поля ввода и сохраненного в state React объекта. */
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setCurrentData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    /** Функция отправляет на сервер изменённые данные. */
    async function sendDataToDB(): Promise<void> {
        try {
            const filmId = currentData.kinopoiskId;
            const objForSend = {
                nameRu: currentData.nameRu,
                nameOriginal: currentData.nameOriginal
            };

            const accessToken = localStorage.getItem(
                FAKEIVI_ACCESS_TOKEN
            ) as string;

            await axiosAuth.put(`api/movies/about/${filmId}`, objForSend, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                }
            });

            changeFilmList(currentData);
            handleClose();
        } catch (e: unknown) {
            const error = e as AxiosError;
            catchError(error);
        }
    }

    /** Функционал добавляет эффект плавного появления для элемента с условным рендерингом. */
    useEffect(() => {
        if (isPopapOpen) {
            setIsOpen(true);
        }
    }, [isPopapOpen]);

    return (
        <div
            className={styles.wrapper + (isOpen ? " " + styles.open : "")}
            onClick={handleClick}
        >
            <div className={styles.body}>
                <div className={styles.closeIcon}>
                    <BsXLg />
                </div>
                <div className={styles.title}>
                    <FormattedMessage id="ChangeFilmName" />
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>
                        <FormattedMessage id="RussianName" />
                    </div>
                    <input
                        type="text"
                        name="nameRu"
                        className={styles.input}
                        value={currentData.nameRu}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>
                        <FormattedMessage id="EnglishName" />
                    </div>
                    <input
                        type="text"
                        name="nameOriginal"
                        className={styles.input}
                        value={currentData.nameOriginal}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.buttonArea}>
                    <MyButton
                        type="footer"
                        size="large"
                        onClick={wrapAsyncFunction(sendDataToDB)}
                    >
                        <FormattedMessage id="Change" />
                    </MyButton>
                </div>
            </div>
        </div>
    );
};

export default MoviesChangePopup;
