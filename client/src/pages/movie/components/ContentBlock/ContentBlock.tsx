import Rating from "../Rating/Rating";
import styles from "../../movies.module.scss";
import React from "react";
import MediaQuery from "react-responsive";
import Description from "../Description/Description";
import Buttons from "../Buttons/Button";
import ActorsList from "../ActorsList/ActorsList";
import CountryList from "../CountryList/CountryList";
import Info from "../Info/Info";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";

const ContentBlock = () => {
    const films = useSelector(getFilm());

    return (
        <div className={styles.Movie}>
            <div className={styles.Movie__media}>
                <div className={styles.Movie__video2}>
                    <MediaQuery maxWidth={1240}>
                        <Info />
                        <CountryList />
                    </MediaQuery>
                    <div className={styles.Movie__viideo}>
                        {films?.film?.trailers[0]?.site === "YOUTUBE" ? (
                            <ReactPlayer
                                width={"100%"}
                                url={films.film.trailers[0].url}
                            />
                        ) : (
                            <ReactPlayer
                                url={
                                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                                }
                            />
                        )}
                    </div>
                    <Buttons />
                </div>
            </div>
            <div className={styles.Movie__info}>
                <MediaQuery minWidth={1241}>
                    <Info />
                    <CountryList />
                </MediaQuery>

                <div className={styles.Movie__block}>
                    <Rating type={false} />
                    <ActorsList />
                </div>
                <Description />
                <div className={styles.Movie__rating}>
                    <Rating type={true} />
                </div>
            </div>
        </div>
    );
};

export default ContentBlock;
