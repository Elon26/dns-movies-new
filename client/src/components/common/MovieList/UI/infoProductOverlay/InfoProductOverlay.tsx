import styles from "./InfoProductOverlay.module.scss";
import React from "react";

interface InfoProductOverlayProps {
    string: string;
}

export default function InfoProductOverlay({
    string
}: InfoProductOverlayProps) {
    return <div className={styles.info}>{string}</div>;
}
