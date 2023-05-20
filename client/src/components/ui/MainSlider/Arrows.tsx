import React from "react";
import { useSwiper } from "swiper/react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { IClassNames } from "../../../models";

interface ArrowsProps {
    styles: IClassNames;
}

/** Компонент, содержащий заглушку-спиннер, отображаемую на время загрузки данных. */
const Arrows = ({ styles }: ArrowsProps): React.ReactElement => {
    const swiper = useSwiper();

    return (
        <div className={styles.slider__arrowsCont}>
            <div className={styles.slider__arrowsRow}>
                <button
                    className={`${styles.slider__arrow} ${styles.slider__arrow_prev}`}
                    onClick={() => swiper.slidePrev()}
                >
                    <BsChevronCompactLeft />
                </button>
                <button
                    className={`${styles.slider__arrow} ${styles.slider__arrow_next}`}
                    onClick={() => swiper.slideNext()}
                >
                    <BsChevronCompactRight />
                </button>
            </div>
        </div>
    );
};

export default Arrows;
