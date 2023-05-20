import Link from "next/link";
import styles from "./LinkShowMore.module.scss";
import React from "react";

interface LinkShowMoreProps {
    valueDirection: number;
    href?: string;
}

export default function LinkShowMore({
    valueDirection,
    href
}: LinkShowMoreProps) {
    return (
        <div
            className={styles.container}
            style={{ transform: `translate(${valueDirection}%, 0)` }}
        >
            <Link className={styles.link} href={href || ""}>
                Посмотреть все
            </Link>
        </div>
    );
}
