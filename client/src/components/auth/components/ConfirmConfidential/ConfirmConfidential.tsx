import Link from "next/link";
import React from "react";
import styles from "./ConfirmConfidential.module.scss";
import { FormattedMessage } from "react-intl";

export default function ConfirmConfidential() {
    return (
        <div className={styles.container}>
            <span>
                <FormattedMessage id="RegisterOrLoginMessage1" />
            </span>
            <p>
                <FormattedMessage id="with" />{" "}
                <Link href="https://www.ivi.ru/info/confidential">
                    <FormattedMessage id="RegisterOrLoginMessage2" />
                </Link>
            </p>
            <p>
                <FormattedMessage id="and" />{" "}
                <Link href="https://www.ivi.ru/info/agreement">
                    <FormattedMessage id="RegisterOrLoginMessage3" />
                </Link>
            </p>
        </div>
    );
}
