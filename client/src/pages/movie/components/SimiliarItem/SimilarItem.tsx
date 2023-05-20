import Image from "next/image";
import styles from "../../../../components/common/MovieList/components/movieListItem/MovieListItem.module.scss";
import React, { useState } from "react";
import { ISimiliar } from "../../../../models";
import OverlaySimilar from "../OverlaySimilar/OverlaySimilar";
import Link from "next/link";
import AgeRestriction from "../../../../components/common/MovieList/UI/ageRestrictionOverlay/AgeRestriction";
import { useSelector } from "react-redux";
import { getLang } from "../../../../store/switchLang";

interface SimilarItemProps {
    elem: ISimiliar;
}

export default function SimilatItem({ elem }: SimilarItemProps) {
    const lang = useSelector(getLang());
    const [isHover, setIsHover] = useState(false);

    const handleHover = () => {
        setIsHover((isHover) => !isHover);
    };

    const rand = React.useMemo<number>(() => {
        return Math.random() * 10;
    }, []);

    return (
        <Link href={`/movie/${elem?.filmId}`}>
            <div data-testid="similarItemId" className={styles.item}>
                <div
                    className={styles.image_container}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                >
                    <Image src={elem?.posterUrl} alt="" fill />

                    <AgeRestriction age={elem?.age} />
                    {isHover && <OverlaySimilar rand={rand} elem={elem} />}
                </div>
                <p>
                    {lang === "Ru"
                        ? elem?.nameRu
                        : elem?.nameOriginal
                        ? elem?.nameOriginal
                        : elem?.nameRu}
                </p>
            </div>
        </Link>
    );
}
