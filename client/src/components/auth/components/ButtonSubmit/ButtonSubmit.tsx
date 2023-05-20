import React from "react";
import styles from "./ButtonSubmit.module.scss";

interface ButtonSubmitProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    type?: "submit" | "button" | "reset";
    text: string;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({
    disabled,
    text,
    type = "button",
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            {...props}
            className={styles.button}
        >
            {text}
        </button>
    );
};

export default ButtonSubmit;
