import React from "react";
import styles from "./loader.module.scss";

/** Компонент, содержащий заглушку-спиннер, отображаемую на время загрузки данных. */
const Loader = (): React.ReactElement => {
    return (
        <div className={styles.loaderBody}>
            <span className={styles.loader}></span>
        </div>
    );
};

export default Loader;
