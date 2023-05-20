import { useSelector } from "react-redux";
import styles from "./WatchAnyDevice.module.scss";
import { getFilm } from "../../../../store/film";
import React from "react";
import poster from "../../../../assets/PNG/Poster.png";
import tablet from "../../../../assets/PNG/Tablet.png";
import Image from "next/image";
import MyButton from "../../../../components/common/MyButton/MyButton";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { getLang } from "../../../../store/switchLang";

const WatchAnyDevice = () => {
    const film = useSelector(getFilm());
    const lang = useSelector(getLang());

    return (
        <div className={styles.WatchAnyDevice}>
            <div className={styles.WatchAnyDevice__text}>
                <h1>
                    <FormattedMessage
                        id="WatchOnAllDevices"
                        values={{
                            value:
                                lang === "En" && film?.film?.nameOriginal
                                    ? film?.film?.nameOriginal
                                    : film?.film?.nameRu
                        }}
                    />
                </h1>
                <p>
                    <FormattedMessage id="TheApplication" />
                </p>
                <MyButton type="pink" size="large">
                    <Link href="https://www.ivi.ru/devices">
                        <FormattedMessage id="ConnectDevice" />
                    </Link>
                </MyButton>
            </div>
            <div className={styles.WatchAnyDevice__img}>
                <Image alt="" src={poster} className={styles.Container} />
                <Image
                    alt=""
                    className={styles.Big}
                    src={film?.film?.posterUrl || tablet}
                    width={337}
                    height={192}
                />
                <Image alt="" className={styles.Tablet} src={tablet} />
                <Image
                    alt=""
                    className={styles.Mini}
                    src={film?.film?.posterUrl || tablet}
                    width={188}
                    height={102}
                />
            </div>
        </div>
    );
};

export default WatchAnyDevice;
