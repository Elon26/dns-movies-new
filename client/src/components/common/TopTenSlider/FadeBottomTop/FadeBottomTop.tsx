import React from "react";
import styles from "./FadeBottomTop.module.scss";

interface FadeBottomTopProps {
    children: React.ReactNode;
}

export default function FadeBottomTop({ children }: FadeBottomTopProps) {
    return <div className={styles.background}>{children}</div>;
}
