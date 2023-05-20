import styles from "./DurationOverlay.module.scss";
import React from "react";

interface DurationOverlayProps {
    duration: string;
}

export default function DurationOverlay({ duration }: DurationOverlayProps) {
    return <p className={styles.duration}>{duration}</p>;
}
