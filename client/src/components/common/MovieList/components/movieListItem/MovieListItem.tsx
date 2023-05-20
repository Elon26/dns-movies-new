import styles from "./MovieListItem.module.scss";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { MovieItemTest } from "../../interfaces/interfaces";
import AgeRestriction from "../../UI/ageRestrictionOverlay/AgeRestriction";
import OverlayMovieListItem from "../overlayMovieListItem/OverlayMovieListItem";

interface MovieListItemProps {
    elem: MovieItemTest;
}

export default function MovieListItem({ elem }: MovieListItemProps) {
    const [isHover, setIsHover] = useState(false);

    const handleHover = () => {
        setIsHover((isHover) => !isHover);
    };

    return (
        <Link href={`/movie/${elem.kinopoiskId}`}>
            <div className={styles.item}>
                <div
                    className={styles.image_container}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                >
                    <Image
                        src={elem.posterUrlPreview}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw"
                    />

                    <AgeRestriction />
                    {isHover && <OverlayMovieListItem elem={elem} />}
                </div>
                <p>{elem.nameRu}</p>
            </div>
        </Link>
    );
}
