import React, { CSSProperties } from "react";
import styles from "./CarouselItem.module.scss";

interface CarouselItemProps {
    children: React.ReactNode;
    style: CSSProperties;
    callback?: () => void;
}

export default function CarouselItem({
    children,
    style,
    callback
}: CarouselItemProps) {
    return (
        <article
            onClick={callback}
            style={style}
            className={styles.carousel_item}
        >
            {children}
        </article>
    );
}
