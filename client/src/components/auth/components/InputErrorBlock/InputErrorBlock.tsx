import React from "react";
import styles from "./InputErrorBlock.module.scss";

interface InputErrorBlockProps {
    error: string;
}

export default function InputErrorBlock({ error }: InputErrorBlockProps) {
    return <p className={styles.error}>{error}</p>;
}
