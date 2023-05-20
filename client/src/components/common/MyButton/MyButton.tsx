import styles from "./MyButton.module.scss";
import React from "react";

interface IMyButton {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "gradient" | "footer" | "pink";
    size?: "mini" | "large" | "medium";
    figure?: "circle" | "square";
    testid?: string;
}

const MyButton: React.FC<IMyButton> = (
    { children, onClick, type = "gradient", size, figure, testid },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any
) => {
    return (
        <button
            data-testid={testid}
            className={`${styles.MyButton} ${styles[type]} ${
                styles[size || ""]
            } ${styles[figure || ""]}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default MyButton;
