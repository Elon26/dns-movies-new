import React, { useEffect, FC } from "react";
import styles from "./movies.module.scss";
import { getOneMovie } from "./api/movieId";
import { IMovie } from "../../models";
import { useDispatch, useSelector } from "react-redux";
import { filmAction } from "../../store/film";
import MainModal from "./components/MainModal/MainModal";
import { IPropsMovie } from "./models/IPropsMovie";
import { GetServerSideProps } from "next";
import ContentBlock from "./components/ContentBlock/ContentBlock";
import SliderSimilar from "./components/SliderSimilar/SliderSimilar";
import WatchAnyDevice from "./components/WatchAnyDevice/WatchAnyDevice";
import HeadMovie from "./components/HeadMovie/HeadMovie";
import MainContainer from "../../components/ui/MainContainer/MainContainer";
import { getLang } from "../../store/switchLang";

/** Компонент страницы фильма. */
const Movie: FC<IPropsMovie> = ({ movies }): React.ReactElement => {
    const lang = useSelector(getLang());

    useEffect(() => {
        if (movies) {
            dispatch(filmAction(movies));
        }
    }, [movies]);

    const dispatch = useDispatch();

    if (!movies.film) {
        return <></>;
    }

    return (
        <MainContainer title={movies?.film?.nameOriginal || ""}>
            <HeadMovie />
            <section className={styles.Container}>
                <div className={styles.Container__main}>
                    <ContentBlock />
                    <div className={styles.Container__slider}>
                        <SliderSimilar
                            carouselId={"top10"}
                            data={movies?.film?.similar || []}
                            count={movies?.film?.similar?.length || 0}
                            href={"/movies/all"}
                            headingTitle={
                                lang === "Ru"
                                    ? "С этим фильмом смотрят"
                                    : "Take a look next"
                            }
                        />
                    </div>
                    <MainModal />
                </div>
                <WatchAnyDevice />
            </section>
        </MainContainer>
    );
};

// Для SSR страницы
export const getServerSideProps: GetServerSideProps = async (context) => {
    let data: IMovie | null = null;
    try {
        data = await getOneMovie(String(context?.params?.id));
    } catch (err) {}

    if (!data?.film) {
        return {
            notFound: true
        };
    }
    return {
        props: { movies: data }
    };
};

export default Movie;
