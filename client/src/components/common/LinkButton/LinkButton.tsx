import React from "react";
import Link from "next/link";
import styles from "./linkButton.module.scss";

interface LinkButtonProps {
    text: React.ReactElement;
    color: string;
    link: string;
    fake?: boolean;
}

/** Компонент, содержащий переиспользуемый компонент кнопки со ссылкой. */
const LinkButton = ({
    text,
    color,
    link,
    fake
}: LinkButtonProps): React.ReactElement => {
    return fake ? (
        <div className={styles.linkButton + " " + styles.pink}>{text}</div>
    ) : (
        <Link href={link} className={styles.linkButton + " " + styles.pink}>
            {text}
        </Link>
    );
};

export default LinkButton;
