import { FormattedMessage } from "react-intl";
import React from "react";
import styles from "../../Layout.module.scss";
import Link from "next/link";

const DefaultWindow = () => {
    return (
        <>
            <Link href="/movies/all" className={styles.SearchWindow__p}>
                <FormattedMessage id="PremierFilm" />
            </Link>
            <Link href="/movies/all" className={styles.SearchWindow__p}>
                <FormattedMessage id="NewSubscriptions" />
            </Link>
            <Link href="/movies/all" className={styles.SearchWindow__p}>
                <FormattedMessage id="SerialsAmediateka" />
            </Link>
            <Link href="/movies/all" className={styles.SearchWindow__p}>
                <FormattedMessage id="HighRating" />
            </Link>
        </>
    );
};

export default DefaultWindow;
