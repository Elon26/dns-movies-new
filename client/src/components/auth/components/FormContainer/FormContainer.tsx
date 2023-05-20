import styles from "./FormContainer.module.scss";
import React from "react";

interface FormContainerProps {
    children: React.ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
    return <div className={styles.container}>{children}</div>;
}
