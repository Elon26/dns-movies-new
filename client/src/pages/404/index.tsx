import React from "react";
import styles from "./404.module.scss";
import { FormattedMessage } from "react-intl";

export default function Custom404() {
    return (
        <div className={styles.Back}>
            <div>
                <h1>
                    <FormattedMessage id="Error" />
                </h1>
                <p>
                    <FormattedMessage id="TheRequested" />
                </p>
            </div>
        </div>
    );
}
