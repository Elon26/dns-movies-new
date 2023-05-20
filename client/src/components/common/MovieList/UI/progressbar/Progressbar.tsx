import styles from "./Progressbar.module.scss";
import React from "react";

interface ProgressbarProps {
    size: 2 | 4;
    value?: number;
}

export default function Progressbar({ size, value = 0 }: ProgressbarProps) {
    const fill = value * 10;

    return (
        <div className={styles[`progressbar${size}`]}>
            <div className={styles.active} style={{ width: `${fill}%` }}></div>
        </div>
    );
}
