import React from "react";
import styles from "./FormAuthPageTitle.module.scss";

interface FormAuthPageTitleProps {
    title: string;
}

export default function FormAuthPageTitle({ title }: FormAuthPageTitleProps) {
    return <h1 className={styles.heading}>{title}</h1>;
}
