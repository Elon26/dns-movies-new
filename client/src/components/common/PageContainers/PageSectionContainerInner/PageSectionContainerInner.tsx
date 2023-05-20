import styles from "./PageSectionContainerInner.module.scss";
import React from "react";

interface PageSectionContainerInnerProps {
    children: React.ReactNode;
}

export default function PageSectionContainerInner({
    children
}: PageSectionContainerInnerProps) {
    return <div className={styles.inner}>{children}</div>;
}
