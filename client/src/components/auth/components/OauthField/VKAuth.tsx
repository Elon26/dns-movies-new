import React from "react";
import styles from "./OauthField.module.scss";
import { useRouter } from "next/router";
import { CLIENT_ID, HOST } from "../../../../constants-env";
import { FormattedMessage } from "react-intl";

/** Компонент авторизации, при помощи "В контакте". */
const VKAuth = (): React.ReactElement => {
    const router = useRouter();

    /** Функция осуществляет редирект на страницу vk-авторизации. */
    async function vkAuth(): Promise<void> {
        await router.push(
            `https://oauth.vk.com/authorize?client_id=${CLIENT_ID}&display=popup&redirect_uri=${HOST}&scope=email&response_type=code&v=5.120&state=4194308`
        );
    }

    return (
        <div className={styles.buttonWrapper}>
            <button
                type="button"
                className={styles.oauthButton}
                onClick={vkAuth}
            >
                <span>
                    <FormattedMessage id="LoginViaVK" />
                </span>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/dns-films.appspot.com/o/vk-icon.png?alt=media&token=67ae43a6-e572-45fe-a9f2-2c0208a09ea9"
                    alt="vk"
                    className={styles.vkIcon}
                />
            </button>
        </div>
    );
};

export default VKAuth;
