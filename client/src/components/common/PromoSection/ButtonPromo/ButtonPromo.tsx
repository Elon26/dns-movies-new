import styles from "./ButtonPromo.module.scss";
import React, { HTMLAttributes } from "react";

interface ButtonPromoProps extends HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    priority?: boolean;
}

export default function ButtonPromo({
    children,
    priority = false,
    ...props
}: ButtonPromoProps) {
    const className = priority ? "button_priority" : "button";

    return (
        <button className={styles[className]} type="button" {...props}>
            {children}
        </button>
    );
}
