import styles from "./WindowFilm.module.scss";
import React from "react";
import { IWindowFilm } from "./models/IWindow";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { getGenresList } from "../../../store/genres";
import { getLang } from "../../../store/switchLang";
// import { getCountriesList } from "../../../store/countries";
import { upperCase } from "../../../utils/UpperCase";
import Link from "next/link";
import { countries } from "../../ui/Layout/components/Header/consts/HeaderConst";

const WindowFilm = ({ year }: IWindowFilm) => {
    const genre = useSelector(getGenresList());
    const lang = useSelector(getLang());
    // const countries = useSelector(getCountriesList());

    return (
        <div className={styles.WindowFilm}>
            <div className={styles.WindowFilm__zhanr}>
                <div>
                    <h3 className={styles.WindowFilm__h4}>
                        <FormattedMessage id="Genres" />
                    </h3>
                    {genre?.slice(0, 10).map((gen) => (
                        <Link href={`/movies/${gen.genreNameEng}`} key={gen.id}>
                            <p className={styles.WindowFilm__p}>
                                {lang === "En" && gen.genreNameEng
                                    ? upperCase(gen.genreNameEng)
                                    : upperCase(gen.genreNameRu)}
                            </p>
                        </Link>
                    ))}
                </div>
                <div>
                    <h3 className={styles.WindowFilm__h4}>&nbsp;</h3>
                    {genre?.slice(10, 20).map((gen) => (
                        <Link href={`/movies/${gen.genreNameEng}`} key={gen.id}>
                            <p className={styles.WindowFilm__p}>
                                {lang === "En" && gen.genreNameEng
                                    ? upperCase(gen.genreNameEng)
                                    : upperCase(gen.genreNameRu)}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.WindowFilm__country}>
                <div>
                    <h3 className={styles.WindowFilm__h4}>
                        <FormattedMessage id="Country" />
                    </h3>
                    {countries
                        .map(({ id, countryNameEng, countryNameRu, link }) => (
                            <Link href={`https://www.ivi.ru/movies/${link}`} key={id}>
                                <p className={styles.WindowFilm__p}>
                                    {lang === "En"
                                        ? upperCase(countryNameEng)
                                        : upperCase(countryNameRu)}
                                </p>
                            </Link>
                        ))}
                </div>
                <div>
                    <h3 className={styles.WindowFilm__h4}>
                        <FormattedMessage id="Year" />
                    </h3>
                    {year?.map((key) => (
                        <Link href={`https://www.ivi.ru/movies/${key.name}`} key={key.id}>
                            <div className={styles.WindowFilm__p}>
                                {key.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div></div>
            <div></div>
        </div>
    );
};

export default WindowFilm;
