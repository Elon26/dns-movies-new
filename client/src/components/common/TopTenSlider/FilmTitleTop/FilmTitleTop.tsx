import React from "react";
import styles from "./FilmTitleTop.module.scss";

interface FilmTitleTopProps {
    raiting: number;
}

export default function FilmTitleTop({ raiting }: FilmTitleTopProps) {
    return (
        <div className={styles.title}>
            <img src={`/top10/${raiting}.png`} alt="" />
        </div>
    );
}
