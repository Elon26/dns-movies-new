import React from "react";
import styles from "../../movies.module.scss";
import TrailerMain from "../../../../components/ui/TrailerMain/TrailerMain";
import MyButton from "../../../../components/common/MyButton/MyButton";
import { FormattedMessage } from "react-intl";
import Share from "../Share/Share";
import Image from "next/image";
import youtube from "../../../../assets/SVG/Youtube/Youtube.svg";
import bookmark from "../../../../assets/SVG/Bookmark/Bookmark.svg";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";

const Buttons = () => {
    const films = useSelector(getFilm());

    return (
        <div className={styles.Movie__button}>
            <div>
                {films?.film?.trailers ? (
                    <TrailerMain
                        trailer={films?.film?.trailers?.[0]?.url || ""}
                        content={
                            <MyButton
                                data-testid="button"
                                type="footer"
                                size="medium"
                            >
                                <FormattedMessage id="trailer" />
                            </MyButton>
                        }
                    />
                ) : (
                    ""
                )}

                <MyButton type="footer" size="mini">
                    <Image src={bookmark} alt="" width={25} height={25} />
                </MyButton>
                <Share />
            </div>
            <div>
                <MyButton type="footer" size="medium">
                    <Image src={youtube} alt="" width={25} height={25} />
                    <FormattedMessage
                        id="freeFilm"
                        defaultMessage={"Бесплатные фильмы"}
                    />
                </MyButton>
            </div>
        </div>
    );
};

export default Buttons;
