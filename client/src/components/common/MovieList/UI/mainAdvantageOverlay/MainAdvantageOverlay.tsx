import styles from "./MainAdvantageOverlay.module.scss";
import React from "react";
import Progressbar from "../progressbar/Progressbar";
import { FormattedMessage } from "react-intl";

export default function MainAdvantage() {
    return (
        <div className={styles.advantage}>
            <p>
                <FormattedMessage id="Story" />
            </p>
            <Progressbar size={4} value={4} />
        </div>
    );
}
