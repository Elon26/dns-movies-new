import React, { FC } from "react";
import styles from "./BlockSearch.module.scss";
import { BsCameraReels } from "react-icons/bs";
import { IBlockSearch } from "./models/IBlockSearch";
import Link from "next/link";

const BlockSearch: FC<IBlockSearch> = ({ name, year, id, callback }) => {
    return (
        <Link href={`/movie/${id}`} onClick={callback}>
            <div className={styles.BlockSearch}>
                <div className={styles.BlockSearch__icon}>
                    <BsCameraReels />
                </div>
                <div className={styles.BlockSearch__text}>
                    <div className={styles.Name}>{name}</div>
                    <div className={styles.Year}>{year}</div>
                </div>
            </div>
        </Link>
    );
};

export default BlockSearch;
