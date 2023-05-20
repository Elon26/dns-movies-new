import React, { FC, useState } from "react";
import { IRating } from "./models/IRating";
import styles from "./Rating.module.scss";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";
import MyButton from "../../../../components/common/MyButton/MyButton";
import Modal from "../../../../components/common/Modal/Modal";

let arr = new Array(10);
arr = arr.fill(1);

const Rating: FC<IRating> = ({ type }) => {
    const [visible, setVisible] = useState<boolean>(false);
    const film = useSelector(getFilm());
    const [slide, setSlide] = useState<number>(0);

    const slideMove = (num: number) => {
        setSlide((p) => p + num);
    };

    const call = () => {
        setSlide(0);
        setVisible(false);
    };

    return (
        <>
            <div data-testid="buttonRating" onClick={() => setVisible(true)}>
                {type ? (
                    <div className={styles.Rating__large}>
                        <MyButton type="footer" size="large">
                            <div
                                className={styles.Rating__mark}
                                style={{
                                    background:
                                        Number(film?.film?.ratingKinopoisk) > 7
                                            ? "green"
                                            : Number(
                                                  film?.film?.ratingKinopoisk
                                              ) > 4
                                            ? "orange"
                                            : "red"
                                }}
                            >
                                {film?.film?.ratingKinopoisk || 0}
                            </div>
                            <p>
                                <FormattedMessage id="RatingIvi" />
                            </p>
                            <div className={styles.Rating__review}>
                                <p>
                                    <FormattedMessage id="Estimate" />
                                </p>
                            </div>
                        </MyButton>
                    </div>
                ) : (
                    <>
                        <MyButton type="footer" size="large">
                            <div
                                style={{
                                    background:
                                        Number(film?.film?.ratingKinopoisk) > 7
                                            ? "green"
                                            : Number(
                                                  film?.film?.ratingKinopoisk
                                              ) > 4
                                            ? "orange"
                                            : "red"
                                }}
                            >
                                {film?.film?.ratingKinopoisk || 0}
                            </div>
                        </MyButton>
                        <p>
                            <FormattedMessage id="RatingIvi" />
                        </p>
                    </>
                )}
            </div>
            <Modal callback={() => call()} visible={visible}>
                <div
                    data-testid="modalRating"
                    style={{ transform: `translateX(` + String(-slide) + "%)" }}
                    className={styles.Slider}
                >
                    <div className={styles.Container}>
                        <div className={styles.Unit}>
                            <div>
                                <div className={styles.Rating__text}>
                                    <h1>
                                        <FormattedMessage id="YourMark" />
                                    </h1>
                                </div>
                                <div className={styles.Rating__text}>
                                    <p className={styles.Review}>
                                        <FormattedMessage id="MarkImproveRecomendation" />
                                    </p>
                                </div>

                                <div className={styles.Rating}>
                                    {arr?.map((arr, i) => (
                                        <div
                                            key={i}
                                            onClick={() => slideMove(100)}
                                            className={styles.Rating__unit}
                                        >
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                                <div
                                    className={
                                        styles.Rating__veryBad +
                                        " " +
                                        styles.Rating__text
                                    }
                                >
                                    <p>
                                        <FormattedMessage id="VeryBad" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="VeryGood" />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.Unit + " " + styles.Container}>
                            <h1>
                                <FormattedMessage id="YourMarkAccept" />
                            </h1>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Rating;
