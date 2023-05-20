import styles from "./ReviewList.module.scss";
import React from "react";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";

export interface IElem {
    date: string;
    name?: string;
    text: string;
}

interface MovieListItemProps {
    elem: IElem;
    callback: () => void;
}

export default function ReviewList({ elem, callback }: MovieListItemProps) {
    return (
        <div className={styles.ReviewList} onClick={callback}>
            <div className={styles.ReviewList__user}>
                <p>{elem?.name || "Пользователь"}</p>
            </div>
            <div className={styles.ReviewList__title}>{elem?.text}</div>
            <div className={styles.ReviewList__down}>
                <div className={styles.ReviewList__date}>{elem?.date}</div>
                <div className={styles.ReviewList__mark}>
                    <BsHandThumbsUp />
                    <p>36</p>
                    <BsHandThumbsDown />
                </div>
            </div>
        </div>
    );
}
