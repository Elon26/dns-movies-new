import React, { useState } from "react";
import styles from "./filmCardsField.module.scss";

interface IconWithHintProps {
    text: string;
    icon: React.ReactElement;
}

/** Компонент c иконкой со всплывающей подсказкой */
const IconWithHint = ({
    text,
    icon
}: IconWithHintProps): React.ReactElement => {
    const [isInHover, setIsInHover] = useState<boolean>(false);

    return (
        <div className={styles.iconField}>
            <div
                className={styles.icon}
                onMouseOver={() => setIsInHover(true)}
                onMouseOut={() => setIsInHover(false)}
            >
                {icon}
            </div>
            <div
                className={
                    styles.hint + (isInHover ? " " + styles.hint_visible : "")
                }
            >
                {text}
            </div>
        </div>
    );
};

export default IconWithHint;
