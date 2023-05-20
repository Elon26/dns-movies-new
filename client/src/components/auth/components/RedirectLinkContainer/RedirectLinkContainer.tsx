import React from "react";
import styles from "./RedirectLinkContainer.module.scss";

interface RedirectLinkContainerProps {
    title: string;
    children: React.ReactNode;
}

export default function RedirectLinkContainer({
    title,
    children
}: RedirectLinkContainerProps) {
    return (
        <div className={styles.container}>
            <p>{title}</p>
            {children}
        </div>
    );
}
