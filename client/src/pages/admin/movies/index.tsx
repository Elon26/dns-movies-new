import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/ui/MainContainer/MainContainer";
import { getLang } from "../../../store/switchLang";
import { useSelector } from "react-redux";
import { domen } from "../../../constats";
import getFilmCards from "../../../services/getFilmCards";
import { IMovieFromMoviesList } from "../../../models";
import Loader from "../../../components/common/Loader/Loader";
import styles from "./movies.module.scss";
import MoviesChangeItem from "../components/MoviesChangeItem/MoviesChangeItem";

/** Компонент страницы редактирования фильмов. */
const MoviesChangePanel = (): React.ReactElement => {
    const lang = useSelector(getLang());
    const [filmCards, setCardsFilms] = useState<IMovieFromMoviesList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /** Функция формирует поисковой запрос и запрашивает карточки фильмов в соответствии с ним. */
    async function getFilms(): Promise<void> {
        const requestUrl = `${domen}movies/filters?page=0&size=2621&orderBy=nameRu`;
        setIsLoading(true);
        const response = await getFilmCards(requestUrl);
        if (response) setCardsFilms(response.rows);
        setIsLoading(false);
    }

    function changeFilmList(filmCard: IMovieFromMoviesList): void {
        setCardsFilms((prev) =>
            prev.map((film) => {
                if (film.id === filmCard.id) {
                    return filmCard;
                }
                return film;
            })
        );
    }

    /** Данная настройка вызывает загрузку первоначального набора карточек фильмов при первичной отрисовке страницы. */
    useEffect(() => {
        const fetchData = async () => {
            await getFilms();
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = fetchData();
    }, []);

    if (isLoading) return <Loader />;

    return (
        <MainContainer
            title={lang === "Ru" ? "Редактирование фильмов" : "Film change"}
        >
            <section>
                <div className="container">
                    <div className={styles.moviesWrapper}>
                        {filmCards.map((filmCard) => (
                            <MoviesChangeItem
                                key={filmCard.id}
                                filmCard={filmCard}
                                changeFilmList={changeFilmList}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </MainContainer>
    );
};

export default MoviesChangePanel;
