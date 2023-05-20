import React, { FC, useState } from "react";
import styles from "./ReviewBlock.module.scss";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { useAppSelector } from "../../../../hooks/reduxHook";
import { getLang } from "../../../../store/switchLang";

interface IReview {
    name: string;
    text: string;
    date: string;
}

const ReviewBlock: FC<IReview> = ({ name, text, date }) => {
    const [time] = useState<string>(
        date?.split("-").slice(0, 3).join(".").split("T")[0]
    );
    const lang = useAppSelector(getLang());

    return (
        <div className={styles.ReviewBlock}>
            <div className={styles.ReviewBlock__avatar}>
                <div>
                    {name
                        ? name?.[0]?.toUpperCase()
                        : lang === "Ru"
                        ? " П"
                        : "U"}
                </div>
            </div>
            <div className={styles.ReviewBlock__info}>
                <div className={styles.ReviewBlock__header}>
                    <div className={styles.User}>
                        {name
                            ? name.toString()
                            : lang === "Ru"
                            ? "Пользователь"
                            : "User"}
                    </div>
                    <div className={styles.Date}>{time}</div>
                </div>
                <div className={styles.ReviewBlock__text}>
                    <p>{text}</p>
                </div>
            </div>
            <div className={styles.ReviewBlock__mark}>
                <div className={styles.Like}>
                    <BsHandThumbsUp />
                </div>
                <div>36</div>
                <div className={styles.Dislike}>
                    <BsHandThumbsDown />
                </div>
            </div>
        </div>
    );
};

export default ReviewBlock;
