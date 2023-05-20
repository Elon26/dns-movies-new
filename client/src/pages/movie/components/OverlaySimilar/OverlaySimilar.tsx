import React from "react";
import styles from "../../../../components/common/MovieList/components/overlayMovieListItem/OverlayMovieListItem.module.scss";
import { ISimiliar } from "../../../../models";
import ButtonBookmarkOverlay from "../../../../components/common/MovieList/UI/ButtonBookmarkOverlay/ButtonBookmarkOverlay";
import ButtonMagicOverlay from "../../../../components/common/MovieList/UI/buttonMagicOverlay/ButtonMagicOverlay";
import ButtonStarOverlay from "../../../../components/common/MovieList/UI/buttonStarOverlay/ButtonStarOverlay";
import ButtonCircleOverlay from "../../../../components/common/MovieList/UI/buttonCircleOverlay/ButtonCircleOverlay";
import RaitingOverlay from "../../../../components/common/MovieList/UI/raitingOverlay/RaitingOverlay";
import MainAdvantage from "../../../../components/common/MovieList/UI/mainAdvantageOverlay/MainAdvantageOverlay";

interface OverlaySliderItemProps {
    elem: ISimiliar;
    rand: number;
}

const elemArr = {
    a: 1,
    b: 2,
    c: 3
};

export default function OverlaySimilar({ elem, rand }: OverlaySliderItemProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.icons}>
                    <ButtonBookmarkOverlay />
                    <ButtonMagicOverlay />
                    <ButtonStarOverlay />
                    <ButtonCircleOverlay />
                </div>
                <div className={styles.info}>
                    <RaitingOverlay
                        rating={elem?.rating || rand.toFixed(1)}
                        ratingArr={elem?.ratingArr || elemArr}
                    />
                    <MainAdvantage />
                </div>
            </div>
        </div>
    );
}
