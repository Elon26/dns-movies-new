import React from "react";
import styles from "./InputField.module.scss";

interface InputFieldProps extends React.HTMLAttributes<HTMLInputElement> {
    value: string;
    name: string;
    type: "text" | "password" | "email";
    valid?: boolean;
    autoComplete?: "off" | "on" | "new-password";
}

const InputField: React.FC<InputFieldProps> = ({
    value,
    name,
    type,
    valid = true,
    autoComplete = "on",
    ...props
}) => {
    return (
        <input
            autoComplete={autoComplete}
            value={value}
            name={name}
            type={type}
            className={styles[valid ? "input" : "invalid"]}
            {...props}
        />
    );
};

export default InputField;
