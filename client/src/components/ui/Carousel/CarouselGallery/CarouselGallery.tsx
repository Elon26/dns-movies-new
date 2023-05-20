import React from "react";
import styles from "./CarouselGallery.module.scss";

interface CarouselGalleryProps {
    carouselId: string;
    children: React.ReactNode;
    mode: "list" | "slider";
}

export default function CarouselGallery({
    carouselId,
    children,
    mode
}: CarouselGalleryProps) {
    return (
        <div id={carouselId} className={styles[`carousel_${mode}`]}>
            {children}
        </div>
    );
}
