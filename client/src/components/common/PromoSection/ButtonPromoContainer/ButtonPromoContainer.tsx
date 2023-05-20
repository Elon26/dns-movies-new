import styles from "./ButtonPromoContainer.module.scss";
import React from "react";

interface ButtonPromoContainerProps {
    children: React.ReactNode;
}

export default function ButtonPromoContainer({
    children
}: ButtonPromoContainerProps) {
    return <div className={styles.container}>{children}</div>;
}
