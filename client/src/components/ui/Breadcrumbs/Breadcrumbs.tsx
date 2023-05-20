import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./breadcrumbs.module.scss";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { getLang } from "../../../store/switchLang";
import axios, { AxiosError } from "axios";
import { IData } from "../../../pages/movie/models/IApi";
import { IMovie } from "../../../models";
import { domen } from "../../../constats";
import catchError from "../../../utils/catchError";
import { wrapAsyncFunction } from "../../../utils/wrapAsyncFunction";
import { getGenresList } from "../../../store/genres";

/** Компонент навигационной цепочки. */
const Breadcrumbs = (): React.ReactElement => {
    const lang = useSelector(getLang());
    const genreObjects = useSelector(getGenresList());
    const [filmData, setFilmData] = useState<IMovie | null>(null);

    /** Функционал получает значение адресной строки и преобразует его в массив звеньев навигационной цепочки. */
    const router = useRouter();
    const routesBeforeDBBugfix = router.asPath.split("/");
    routesBeforeDBBugfix.shift();
    const routes = routesBeforeDBBugfix.map((item) => item.replace("%20", " "));

    /** Функционал преобразует значения из адресной строки в русифицированные названия разделов. */
    let firstLinkName;
    switch (routes[0]) {
        case "movies":
            firstLinkName = <FormattedMessage id="Films" />;
            break;
        case "movie":
            firstLinkName = <FormattedMessage id="Films" />;
            break;
        case "person":
            firstLinkName = <FormattedMessage id="Actors" />;
            break;
        case "admin":
            firstLinkName = <FormattedMessage id="AdminPanel" />;
            break;
        default:
            break;
    }

    let secondLinkName;
    if (routes.length > 1) {
        if (routes[0] === "movies") {
            const currentGenreObj = genreObjects.find(
                (item) => item.genreNameEng === routes[1]
            );
            secondLinkName =
                routes[1] === "all" ? (
                    <FormattedMessage id="AllFilms" />
                ) : lang === "Ru" ? (
                    currentGenreObj?.genreNameRu
                ) : (
                    currentGenreObj?.genreNameEng
                );
        }
        if (routes[0] === "movie" && filmData) {
            secondLinkName =
                lang === "Ru"
                    ? filmData.film?.nameRu
                    : filmData.film?.nameOriginal
                        ? filmData.film?.nameOriginal
                        : filmData.film?.nameRu;
        }
        if (routes[0] === "admin") {
            secondLinkName =
                routes[1] === "genres" ? (
                    <FormattedMessage id="Genres" />
                ) : (
                    <FormattedMessage id="Films" />
                );
        }
    }

    /** Функция запрашивает карточку фильма. */
    async function getFilmData(): Promise<void> {
        try {
            const response: IData<IMovie> = await axios.get(
                `${domen}movies/about/${routes[1]}`
            );
            const data = response.data;
            setFilmData(data);
        } catch (e: unknown) {
            const error = e as AxiosError;
            catchError(error);
        }
    }

    if (routes[0] === "movie") {
        useEffect(wrapAsyncFunction(getFilmData), []);
    }

    /** Функционал запрещает хлебные крошки для Главной страницы. */
    if (routes.length === 1 && routes[0] === "") return <></>;

    return (
        <div className="container">
            <div className={styles.breadcrumbs}>
                <Link
                    className={styles.breadcrumbs__link}
                    href={"/"}
                    data-testid="firstLinkNameFromBreadcrumbs"
                >
                    <FormattedMessage id="MainPage" />
                </Link>
                <span className={styles.breadcrumbs__separator}> / </span>
                {routes.length === 1 && (
                    <span className={styles.breadcrumbs__end}>
                        {firstLinkName}
                    </span>
                )}
                {routes.length === 2 && routes[0] === "movies" && (
                    <>
                        <Link
                            className={styles.breadcrumbs__link}
                            href={"/movies/all"}
                            data-testid="secondLinkNameFromBreadcrumbs"
                        >
                            {firstLinkName}
                        </Link>
                        <span className={styles.breadcrumbs__separator}>
                            {" "}
                            /{" "}
                        </span>
                        <span
                            className={styles.breadcrumbs__end}
                            data-testid="thirdLinkNameFromBreadcrumbs"
                        >
                            {secondLinkName}
                        </span>
                    </>
                )}
                {routes.length === 2 && routes[0] === "movie" && (
                    <>
                        <Link
                            className={styles.breadcrumbs__link}
                            href={"/movies/all"}
                        >
                            {firstLinkName}
                        </Link>
                        <span className={styles.breadcrumbs__separator}>
                            {" "}
                            /{" "}
                        </span>
                        <span className={styles.breadcrumbs__end}>
                            {secondLinkName}
                        </span>
                    </>
                )}
                {routes.length === 2 && routes[0] === "admin" && (
                    <>
                        <Link
                            className={styles.breadcrumbs__link}
                            href={"/admin"}
                        >
                            {firstLinkName}
                        </Link>
                        <span className={styles.breadcrumbs__separator}>
                            {" "}
                            /{" "}
                        </span>
                        <span className={styles.breadcrumbs__end}>
                            {secondLinkName}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default Breadcrumbs;
