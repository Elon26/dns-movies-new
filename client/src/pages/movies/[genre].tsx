import React, { useState, useEffect } from "react";
import MainContainer from "../../components/ui/MainContainer/MainContainer";
import styles from "./movies.module.scss";
import { useRouter } from "next/router";
import getMoviesPageDescription from "../../utils/getMoviesPageDescription";
import { defaultFilter, defaultGenre, domen } from "../../constats";
import { IFilterParams, IMovieFromMoviesList } from "../../models";
import { wrapAsyncFunction } from "../../utils/wrapAsyncFunction";
import { useSelector } from "react-redux";
import { getLang } from "../../store/switchLang";
import { getGenresList } from "../../store/genres";
import { getCountriesList } from "../../store/countries";
import getFilmCards from "../../services/getFilmCards";
import FiltersField from "./components/FiltersField/FiltersField";
import FilmCardsField from "./components/FilmCardsField/FilmCardsField";
import SortField from "./components/SortField/SortField";
import TitleField from "./components/TitleField/TitleField";

/** Компонент cписка фильмов конкретного жанра. */
const MoviesByGenre = (): React.ReactElement => {
    const lang = useSelector(getLang());
    const genreObjects = useSelector(getGenresList());
    const countryObjects = useSelector(getCountriesList());

    /** Данный раздел получает жанр из адресной строки и возвращает его руссифицированное значение и описание. */
    const router = useRouter();
    const currentGenre = router.query.genre as string;
    const currentGenreObj =
        genreObjects.find((item) => item.genreNameEng === currentGenre) || null;
    const isExistingGenre = genreObjects.findIndex(
        (item) => item.genreNameEng === currentGenre
    );
    const pageTitle =
        currentGenre === "all"
            ? lang === "Ru"
                ? defaultGenre.rusTitle
                : defaultGenre.engTitle
            : lang === "Ru"
                ? currentGenreObj?.genreNameRu
                : currentGenreObj?.genreNameEng;
    const pageDescription =
        currentGenre === "all"
            ? lang === "Ru"
                ? defaultGenre.rusDescription
                : defaultGenre.engDescription
            : getMoviesPageDescription(currentGenre, lang)
                ? getMoviesPageDescription(currentGenre, lang)
                : lang === "Ru"
                    ? "Описание жанра не задано"
                    : "Genre description is not specified";

    /** Данный раздел устанавливает значения по умолчанию для параметров сортировки и фильтрации. */
    const [sortParam, setSortParam] = useState<string>("ratingKinopoisk");
    const [filterParams, setFilterParams] = useState<IFilterParams>({
        ...defaultFilter,
        sort: sortParam
    });

    const [filmCards, setFilmCards] = useState<IMovieFromMoviesList[]>([]);

    /** Данный раздел устанавливает значения количества загружаемых карточек фильмов, в зависимости от размера экрана. */
    let pageSize = "21";
    if (window.innerWidth <= 1280) pageSize = "18";
    if (window.innerWidth <= 992) pageSize = "15";
    if (window.innerWidth <= 768) pageSize = "9";

    const [paginate, setPaginate] = useState<number>(0);
    const [isLastPage, setIsLastPage] = useState<boolean>(true);

    /** Функция меняет параметры фильтрации страницы */
    async function handleChangeFilter(
        filterKey: string,
        filterValue: number | string | string[]
    ): Promise<void> {
        if (typeof filterValue === "number") {
            const newFilterParams = {
                ...filterParams,
                [filterKey]: filterValue
            };
            setFilterParams(newFilterParams);
            await getFirstFilmcards(newFilterParams);
        }

        if (typeof filterValue === "string") {
            const newFilterParams = {
                ...filterParams,
                [filterKey]: filterValue
            };
            setFilterParams(newFilterParams);

            if (filterKey === "genre") {
                const currentGenreObj = genreObjects.find((item) =>
                    lang === "Ru"
                        ? item.genreNameRu === filterValue
                        : item.genreNameEng === filterValue
                );

                if (currentGenreObj) {
                    const route = `/movies/${currentGenreObj.genreNameEng}`;
                    await router.push(route);
                }
            }

            if (filterKey === "genre" || filterKey === "country") {
                await getFirstFilmcards(newFilterParams);
            }
        }

        if (typeof filterValue === "object") {
            let newFilterParams = filterParams;
            if (filterKey === "director") {
                newFilterParams = {
                    ...newFilterParams,
                    director: filterValue[0],
                    directorId: filterValue[1]
                };
            }
            if (filterKey === "actor") {
                newFilterParams = {
                    ...newFilterParams,
                    actor: filterValue[0],
                    actorId: filterValue[1]
                };
            }
            setFilterParams(newFilterParams);
        }
    }

    /** Функция меняет параметры фильтрации страницы без перезагрузки данных. */
    function handleChangeFilterWhitoutReload(
        filterKey: string,
        filterValue: string
    ): void {
        const newFilterParams = {
            ...filterParams,
            [filterKey]: filterValue
        };
        setFilterParams(newFilterParams);
    }

    /** Функция очищает все установленные фильтры, кроме сортировки. */
    async function clearFilters(): Promise<void> {
        setPaginate(0);
        const newFilter = {
            ...defaultFilter,
            sort: sortParam
        };
        setFilterParams(newFilter);
        await router.push(`/movies/all`);
        await getFirstFilmcards(newFilter);
    }

    /** Функция меняет параметры сортировки и запрашивает карточки фильмов, соответствующие новому запросу. */
    async function changeSortParam(param: string): Promise<void> {
        setSortParam(param);
        const newFilter = {
            ...filterParams,
            sort: param
        };
        setFilterParams(newFilter);
        await getFirstFilmcards(newFilter);
    }

    /** Функция вызывает запрос первоначального набора карточек фильмов. */
    async function getFirstFilmcards(
        filterParams: IFilterParams
    ): Promise<void> {
        setPaginate(0);
        const requestUrl = createRequestUrl(0, filterParams);
        const response = await getFilmCards(requestUrl);
        if (response) {
            setIsLastPage(checkIsLastPage(response.count, 0));
            const arrayOfFilms = response.rows;
            setFilmCards(arrayOfFilms);
        }
    }

    /** Функция вызывает запрос дополнительного набора карточек фильмов. */
    async function getMoreFilmcards(): Promise<void> {
        setPaginate((prev) => ++prev);
        const requestUrl = createRequestUrl(paginate + 1, filterParams);
        const response = await getFilmCards(requestUrl);
        if (response) {
            setIsLastPage(checkIsLastPage(response.count, paginate + 1));
            const arrayOfFilms = response.rows;
            setFilmCards([...filmCards, ...arrayOfFilms]);
        }
    }

    /** Функция сравнивает общее число карточек, соответствующих запросу, с количеством отображённых карточек и возвращает булевое значение того, является ли данная страница пагинации последней. */
    function checkIsLastPage(count: number, pag: number): boolean {
        const currentPageCardsLimit = (pag + 1) * +pageSize;
        return count <= currentPageCardsLimit;
    }

    /** Функция формирует запрос для отправки на сервер. */
    function createRequestUrl(
        pag: number,
        filterParams: IFilterParams
    ): string {
        const genreObj = genreObjects.find(
            (genre) =>
                genre.genreNameEng === filterParams.genre ||
                genre.genreNameRu === filterParams.genre
        );
        const countryObj = countryObjects.find(
            (country) =>
                country.countryNameEng === filterParams.country ||
                country.countryNameRu === filterParams.country
        );

        const requestUrlMixed = `${domen}movies/filters?page=${pag}&size=${pageSize}&ratingKinopoisk=${filterParams.rate}&ratingKinopoiskVoteCount=${filterParams.votes}&orderBy=${filterParams.sort}`;
        const requestUrlGenre = genreObj ? `&genreId=${genreObj.id}` : "";
        const requestUrlCountry = countryObj
            ? `&countryId=${countryObj.id}`
            : "";
        const requestUrlDirector =
            filterParams.directorId !== "-1"
                ? `&DIRECTOR=${filterParams.directorId}`
                : "";
        const requestUrlActor =
            filterParams.actorId !== "-1"
                ? `&ACTOR=${filterParams.actorId}`
                : "";
        const requestUrl =
            requestUrlMixed +
            requestUrlGenre +
            requestUrlCountry +
            requestUrlDirector +
            requestUrlActor;

        return requestUrl;
    }

    /** Данная настройка вызывает загрузку первоначального набора карточек фильмов при первичной отрисовке страницы. */
    useEffect(() => {
        const fetchData = async () => {
            const currentFilterParams = {
                ...filterParams,
                genre: currentGenre
            };
            setFilterParams(currentFilterParams);
            await getFirstFilmcards(currentFilterParams);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = fetchData();
    }, []);

    /** Данная настройка вызывает загрузку карточек фильмов при смене жанра, а также осуществляет редирект на страницу 404, если указанный в адресной строке жанр отсутствует в базе данных. */
    useEffect(() => {
        const fetchData = async () => {
            if (
                currentGenre &&
                currentGenre !== "all" &&
                isExistingGenre === -1
            ) {
                await router.push("/404");
            } else {
                const currentFilterParams = {
                    ...filterParams,
                    genre: currentGenre
                };
                setFilterParams(currentFilterParams);
                await getFirstFilmcards(currentFilterParams);
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = fetchData();
    }, [currentGenre]);

    return (
        <MainContainer
            title={lang === "Ru" ? "Cтраница медиатеки" : "Media Library"}
        >
            <section>
                <div className="container">
                    <TitleField
                        pageTitle={pageTitle}
                        pageDescription={pageDescription}
                    />
                    <FiltersField
                        styles={styles}
                        genreObjects={genreObjects}
                        countryObjects={countryObjects}
                        currentGenre={currentGenre}
                        currentGenreObj={currentGenreObj}
                        handleChangeFilter={handleChangeFilter}
                        handleChangeFilterWhitoutReload={
                            handleChangeFilterWhitoutReload
                        }
                        filterParams={filterParams}
                        getFirstFilmcards={wrapAsyncFunction(getFirstFilmcards)}
                        clearFilters={wrapAsyncFunction(clearFilters)}
                    />
                    {filmCards.length > 0 && (
                        <>
                            <SortField
                                sortParam={sortParam}
                                changeSortParam={wrapAsyncFunction(
                                    changeSortParam
                                )}
                            />
                            <FilmCardsField
                                filmCards={filmCards}
                                getMoreFilmcards={wrapAsyncFunction(
                                    getMoreFilmcards
                                )}
                                isLastPage={isLastPage}
                            />
                        </>
                    )}
                    {filmCards.length === 0 && (
                        <div className={styles.emptyMessage}>
                            Не найдены фильмы, удовлетворяющие поисковому
                            запросу, попробуйте изменить параметры поиска.
                        </div>
                    )}
                </div>
            </section>
        </MainContainer>
    );
};

export default MoviesByGenre;
