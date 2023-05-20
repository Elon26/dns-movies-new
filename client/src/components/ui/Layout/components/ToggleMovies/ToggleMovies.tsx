import React, { FC } from "react";
import { year } from "../Header/consts/HeaderConst";
import { FormattedMessage } from "react-intl";
import Toggle from "../../../../common/Toggle/Toggle";
import { upperCase } from "../../../../../utils/UpperCase";
import styles from "../NavigationWindow/NavigationWindow.module.scss";
import { useSelector } from "react-redux";
import { getLang } from "../../../../../store/switchLang";
import { getGenresList } from "../../../../../store/genres";
import { getCountriesList } from "../../../../../store/countries";
import Link from "next/link";

interface IToggleMovies {
    name: string;
    icon: React.ReactNode;
}

const ToggleMovies: FC<IToggleMovies> = ({ name, icon }) => {
    const genres = useSelector(getGenresList());
    const lang = useSelector(getLang());
    const country = useSelector(getCountriesList());

    return (
        <Toggle
            stylesBol={false}
            className={styles.NavigationWindow__toggle}
            nameBtn={
                <p className={styles.NavigationWindow__tabs}>
                    {icon} <FormattedMessage id={name || "All"} />
                </p>
            }
        >
            <div className={styles.NavigationWindow__more}>
                <Link href="/movies/all">
                    <FormattedMessage id="All" />{" "}
                    <FormattedMessage id={name || "All"} />
                </Link>
            </div>
            <div className={styles.NavigationWindow__genre}>
                <div>
                    <p>
                        <FormattedMessage id="Genres" />
                    </p>
                    {genres
                        .slice(0, 10)
                        .map(({ id, genreNameEng, genreNameRu }) => (
                            <Link href={`/movies/${genreNameEng}`}>
                                <div key={id}>
                                    {lang === "En" && genreNameEng
                                        ? upperCase(genreNameEng)
                                        : upperCase(genreNameRu)}
                                </div>
                            </Link>
                        ))}
                </div>
                <div>
                    <p>
                        <FormattedMessage id="Country" />
                    </p>
                    {country
                        ?.slice(0, 3)
                        .map(({ id, countryNameEng, countryNameRu }) => (
                            <Link href={`/movies/${countryNameEng}`}>
                                <div key={id}>
                                    {lang === "En" && countryNameEng
                                        ? upperCase(countryNameEng)
                                        : upperCase(countryNameRu)}
                                </div>
                            </Link>
                        ))}
                </div>
                <div>
                    <p>
                        <FormattedMessage id="Year" />
                    </p>
                    {year?.slice(0, 3).map(({ id, name }) => (
                        <Link href={`/movies/${name}`}>
                            <div key={id}>{name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </Toggle>
    );
};

export default ToggleMovies;
