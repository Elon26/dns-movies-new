import React, { useState, useEffect } from "react";
import more from "../../../../../assets/SVG/More/More.svg";
import styles from "./NavigationWindow.module.scss";
import Image from "next/image";
import MyButton from "../../../../common/MyButton/MyButton";
import diamond from "../../../../../assets/SVG/Diamond/Diamond.svg";
import reward from "../../../../../assets/SVG/Reward/Reward.svg";
import close from "../../../../../assets/SVG/Close/Close.svg";
import { FormattedMessage } from "react-intl";
import ToggleMovies from "../ToggleMovies/ToggleMovies";
import Social from "../Socials/Social";
import Link from "next/link";
import Apps from "../Apps/Apps";
import { BsCameraReels, BsJoystick, BsYoutube } from "react-icons/bs";
import { useRouter } from "next/router";
import LogoutButton from "../../../../auth/components/LogoutButton/LogoutButton";
import useAuth from "../../../../auth/hooks/useAuth";
import Modal from "../../../../common/Modal/Modal";

/** Компонент модального окна поиска в Header */
const NavigationWindow = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const router = useRouter();
    const auth = useAuth()?.auth;
    useEffect(() => {
        setVisible(false);
    }, [router.asPath]);

    return (
        <div className={styles.NavigationWindow}>
            <div
                className={styles.NavigationWindow__div}
                onClick={() => setVisible((p) => !p)}
            >
                {visible ? (
                    <>
                        <Image src={close} alt="" />
                        <p>
                            <FormattedMessage id="Close" />
                        </p>
                    </>
                ) : (
                    <>
                        <Image src={more} alt="" />
                        <p>
                            <FormattedMessage id="More" />
                        </p>
                    </>
                )}
            </div>
            <Modal callback={() => setVisible((p) => !p)} visible={visible}>
                <div className={styles.NavigationWindow__modal}>
                    <MyButton type="footer" size="large">
                        <Image src={diamond} alt="" />
                        <p>
                            <FormattedMessage id="ConnectSubscription" />
                        </p>
                    </MyButton>
                    <MyButton type="footer" size="large">
                        <Image src={reward} alt="" />
                        <p>
                            <FormattedMessage id="CertificateActivation" />
                        </p>
                    </MyButton>
                    {auth?.token ? (
                        <LogoutButton />
                    ) : (
                        <Link href="/auth/login">
                            <MyButton
                                type="pink"
                                size="large"
                                onClick={() => router.push("/auth/login")}
                            >
                                <FormattedMessage id="EnterOrRegister" />
                            </MyButton>
                        </Link>
                    )}

                    <Link
                        href="https://ivi.ru"
                        className={styles.NavigationWindow__tabs}
                    >
                        <FormattedMessage id="MyIvi" />
                    </Link>
                    <Link
                        href="https://ivi.ru/new"
                        className={styles.NavigationWindow__tabs}
                    >
                        <FormattedMessage id="WhatNew" />
                    </Link>
                    <ToggleMovies icon={<BsCameraReels />} name="Films" />
                    <ToggleMovies icon={<BsYoutube />} name="Serials" />
                    <ToggleMovies icon={<BsJoystick />} name="Cartoons" />
                    <div className={styles.NavigationWindow__social}>
                        <Social />
                    </div>
                    <div className={styles.NavigationWindow__apps}>
                        <Apps />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default NavigationWindow;
