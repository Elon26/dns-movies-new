import { useSelector } from "react-redux";
import React from "react";
import styles from "../../movies.module.scss";
import { getFilm } from "../../../../store/film";
import Translate from "../../../../components/common/Translate/Translate";

const CountryList = () => {
    const films = useSelector(getFilm());

    return (
        <div className={styles.Movie__country}>
            {films?.film?.countries?.map((country) => (
                <p key={country.id}>{country.countryNameRu} •</p>
            ))}
            {films?.film?.genre?.map((genre) => (
                <p key={genre.id}>
                    <Translate
                        rus={
                            String(genre.genreNameRu[0].toUpperCase()) +
                            String(genre?.genreNameRu?.slice(1))
                        }
                        engl={genre?.genreNameEng}
                    />
                </p>
            ))}
        </div>
    );
};

export default CountryList;
