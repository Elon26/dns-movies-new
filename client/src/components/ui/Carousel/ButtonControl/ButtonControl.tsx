import styles from "./ButtonControl.module.scss";
import React from "react";

interface ButtonControlProps extends React.HTMLAttributes<HTMLButtonElement> {
    direction: "left" | "right";
}

const LEFT_ARROW = <>&#8249;</>;
const RIGHT_ARROW = <>&#8250;</>;

export default function ButtonControl({
    direction,
    ...props
}: ButtonControlProps) {
    const currentDirection = direction === "left" ? LEFT_ARROW : RIGHT_ARROW;

    const area = direction === "left" ? "предыдущий слайд" : "следующий слайд";

    return (
        <button
            className={styles[`button_${direction}`]}
            type="button"
            aria-label={area}
            {...props}
        >
            {currentDirection}
        </button>
    );
}
