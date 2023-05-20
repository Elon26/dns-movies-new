import Head from "next/head";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";
import { getLang } from "../../../../store/switchLang";
import React from "react";

const HeadMovie = () => {
    const film = useSelector(getFilm());
    const lang = useSelector(getLang());

    return (
        <Head>
            <title>
                {film?.film?.nameOriginal && lang === "En"
                    ? film?.film?.nameOriginal
                    : film?.film?.nameRu}
            </title>
            <meta name="description" content={film?.film?.description}></meta>
        </Head>
    );
};

export default HeadMovie;
