import React from "react";
import ReviewBlock from "../ReviewBlock/ReviewBlock";
import { useSelector } from "react-redux";
import { getReview } from "../../../../store/review";
import styles from "./ReviewBlockList.module.scss";
import ChildReview from "../ChildReview/ChildReviews";

const ReviewBlockList = () => {
    const review = useSelector(getReview());

    return (
        <>
            {review?.rows?.map(({ id, name, text, createdAt }) => (
                <div key={id}>
                    <ReviewBlock
                        key={id}
                        name={name}
                        text={text}
                        date={createdAt}
                    />
                    <div className={styles.Container}>
                        <ChildReview id={id} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ReviewBlockList;
