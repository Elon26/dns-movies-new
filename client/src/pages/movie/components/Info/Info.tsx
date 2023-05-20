import React from "react";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";
import { IService } from "../../models/IServise";
import { minHours } from "../../services/minHours";
import styles from "../../movies.module.scss";
import Translate from "../../../../components/common/Translate/Translate";

const Info = () => {
    const films = useSelector(getFilm());
    const minHour: IService = React.useMemo<IService>((): IService => {
        return minHours(Number(films?.film?.filmLength || 0));
    }, [films]);

    return (
        <>
            <h1 data-testid="nameFilmTest">
                <Translate
                    engl={films?.film?.nameOriginal || ""}
                    rus={films?.film?.nameRu || ""}
                />
            </h1>
            <div className={styles.Movie__year}>
                <p>{films?.film?.year} •</p>
                <p>
                    <Translate engl={minHour.en} rus={minHour.ru} /> •
                </p>
                <p>{films?.film?.ratingAgeLimits?.replace("age", "")}+</p>
            </div>
        </>
    );
};

export default Info;
