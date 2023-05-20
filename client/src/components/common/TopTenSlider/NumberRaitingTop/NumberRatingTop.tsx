import styles from "./NumberRatingTop.module.scss";
import Image from "next/image";
import React from "react";

interface NumberRatingTopProps {
    rating: number;
}

export default function NumberRatingTop({ rating }: NumberRatingTopProps) {
    const ratingString = rating?.toString()?.split("");

    return (
        <div className={styles.numbers}>
            {ratingString?.map((rating) => (
                <div key={rating} className={styles.item}>
                    <Image src={`/top10/number${rating}.svg`} fill alt="" />
                </div>
            ))}
        </div>
    );
}
