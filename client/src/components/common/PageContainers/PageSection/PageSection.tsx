import styles from "./PageSection.module.scss";
import React from "react";

interface PageSectionProps {
    children: React.ReactNode;
}

export default function PageSection({ children }: PageSectionProps) {
    return <section className={styles.section}>{children}</section>;
}
