import React from "react";
import styles from "./ErrorBlock.module.scss";

interface ErrorBlockProps {
    error: string;
}

export default function ErrorBlock({ error }: ErrorBlockProps) {
    return <p className={styles.error}>{error}</p>;
}
