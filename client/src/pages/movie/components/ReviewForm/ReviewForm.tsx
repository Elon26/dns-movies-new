import React, { useEffect } from "react";
import styles from "./ReviewForm.module.scss";
import { useRouter } from "next/router";
import { getReviews } from "../../api/createReview";
import {
    getLimit,
    getReview,
    limitAction,
    reviewRequest
} from "../../../../store/review";
import { useDispatch, useSelector } from "react-redux";
import ReviewBlockList from "../ReviewBlockList/ReviewBlockList";
import Form from "../Form/Form";
import { useInView } from "react-intersection-observer";

const ReviewForm = () => {
    const router = useRouter();
    const limit = useSelector(getLimit());
    const review = useSelector(getReview());
    const selectReview = (size?: number) => {
        getReviews(Number(router?.query?.id), size || 10)
            .then((e) => {
                dispatch(reviewRequest(e));
            })
            .catch((e) => console.log(e));
    };
    const dispatch = useDispatch();
    const { ref, inView } = useInView({
        threshold: 0
    });

    useEffect(() => {
        if (inView && Number(review?.rows?.length) < Number(review?.count)) {
            dispatch(limitAction(limit + 10));
            selectReview(limit + 10);
        }
    }, [inView]);

    useEffect(() => {
        selectReview();
    }, []);

    return (
        <div className={styles.Review}>
            <div className={styles.Review__inp + " " + styles.RedLine}>
                <Form callback={() => selectReview(limit)} />
            </div>
            <ReviewBlockList />
            <div className={styles.Ref} ref={ref}></div>
        </div>
    );
};

export default ReviewForm;
