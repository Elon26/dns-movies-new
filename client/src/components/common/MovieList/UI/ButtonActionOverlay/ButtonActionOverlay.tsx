import React, { useState } from "react";
import styles from "./ButtonActionOverlay.module.scss";

interface ButtonActionOverlayProps {
    children: React.ReactNode;
    description: string;
}

export default function ButtonActionOverlay({
    children,
    description
}: ButtonActionOverlayProps) {
    const [visible, setVisible] = useState(false);

    return (
        <button
            className={styles.button}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {visible && <p>{description}</p>}
        </button>
    );
}
