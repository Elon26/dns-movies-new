import styles from "./RaitingOverlay.module.scss";
import React from "react";
import { RaitingArray } from "../../interfaces/interfaces";
import Progressbar from "../progressbar/Progressbar";

interface RatingOverlayProps {
    rating: string[] | string | undefined;
    ratingArr: RaitingArray;
}

export default function RaitingOverlay({
    rating,
    ratingArr
}: RatingOverlayProps) {
    return (
        <div className={styles.container}>
            <div className={styles.raiting}>
                <span>{rating?.[0]}</span>
                <span>{rating?.[1]}</span>
                <span>{rating?.[2]}</span>
            </div>
            <div className={styles.progressbar}>
                <Progressbar size={2} value={ratingArr.a || 5} />
                <Progressbar size={2} value={ratingArr.b || 5} />
                <Progressbar size={2} value={ratingArr.c || 5} />
                <Progressbar size={2} value={ratingArr.d || 5} />
            </div>
        </div>
    );
}
