import React from "react";
import MainContainer from "../../../components/ui/MainContainer/MainContainer";
import { useSelector } from "react-redux";
import { getLang } from "../../../store/switchLang";
import { getGenresList } from "../../../store/genres";
import styles from "./genres.module.scss";
import GenresChangeItem from "../components/GenresChangeItem/GenresChangeItem";

/** Компонент страницы редактирования жанров. */
const GenresChangePanel = (): React.ReactElement => {
    const lang = useSelector(getLang());
    const genreObjects = Object.values(useSelector(getGenresList()));
    const sortedGenreObjects =
        lang === "Ru"
            ? genreObjects.sort((a, b) => {
                if (a.genreNameRu > b.genreNameRu) return 1;
                if (a.genreNameRu < b.genreNameRu) return -1;
                return 0;
            })
            : genreObjects.sort((a, b) => {
                if (a.genreNameEng > b.genreNameEng) return 1;
                if (a.genreNameEng < b.genreNameEng) return -1;
                return 0;
            });

    return (
        <MainContainer
            title={lang === "Ru" ? "Редактирование жанров" : "Genre change"}
        >
            <section>
                <div className="container">
                    <div className={styles.genresWrapper}>
                        {sortedGenreObjects.map((genre) => (
                            <GenresChangeItem key={genre.id} genre={genre} />
                        ))}
                    </div>
                </div>
            </section>
        </MainContainer>
    );
};

export default GenresChangePanel;
