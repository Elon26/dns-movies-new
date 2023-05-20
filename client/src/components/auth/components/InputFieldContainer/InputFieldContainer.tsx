import React from "react";
import styles from "./InputFieldContainer.module.scss";

interface InputFieldContainerProps {
    children: React.ReactNode;
}

export default function InputFieldContainer({
    children
}: InputFieldContainerProps) {
    return <div className={styles.container}>{children}</div>;
}
