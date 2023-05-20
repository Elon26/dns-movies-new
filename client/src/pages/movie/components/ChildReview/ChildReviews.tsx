import { useSelector } from "react-redux";
import Toggle from "../../../../components/common/Toggle/Toggle";
import styles from "./ChildReviews.module.scss";
import React, { useState, FC } from "react";
import { getLang } from "../../../../store/switchLang";
import axios from "axios";
import { domen } from "../../../../constats";
import ReviewBlock from "../ReviewBlock/ReviewBlock";
import Form from "../Form/Form";
import { IData } from "../../models/IApi";
import { IReviewChilds } from "../../models/IReviewBlock";

const ChildReview: FC<{ id: number }> = ({ id }) => {
    const lang = useSelector(getLang());
    const [childs, setChilds] = useState<IReviewChilds>();
    const getChilds = async (id: number) => {
        const res: IData<IReviewChilds> = await axios.get(
            `${domen}reviews/tree/${id}?depth=3`
        );
        setChilds(res.data);
    };

    return (
        <Toggle
            stylesBol={false}
            onClick={() => getChilds(id)}
            nameBtn={lang === "Ru" ? "Ответы" : "Answer"}
        >
            <div className={styles.ChildReview}>
                <div className={styles.ChildReview__form}>
                    <Form callback={() => getChilds(id)} id={id} />
                </div>
                {childs?.childs?.map((review) => (
                    <div key={review.id}>
                        <ReviewBlock
                            name={review.profile.name}
                            text={review.text}
                            date={review.createdAt}
                        />
                    </div>
                ))}
            </div>
        </Toggle>
    );
};

export default ChildReview;
