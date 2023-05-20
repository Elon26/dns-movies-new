import styles from "./PageSectionContainer.module.scss";
import React from "react";

interface PageSectionWrapperProps {
    children: React.ReactNode;
}
export default function PageSectionWrapper({
    children
}: PageSectionWrapperProps) {
    return <div className={styles.wrapper}>{children}</div>;
}
