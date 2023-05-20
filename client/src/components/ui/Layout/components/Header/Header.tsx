import logo from "../../../../../assets/SVG/Logo/Logo.svg";
import HeaderWindow from "../../../../common/HeaderWindow/HeaderWindow";
import MyButton from "../../../../common/MyButton/MyButton";
import SearchWindow from "../SearchWindow/SearchWindow";
import WindowFilm from "../../../../common/WindowFilm/WindowFilm";
import user from "../../../../../assets/SVG/Users/User.svg";
import React from "react";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import MediaQuery from "react-responsive";
import UserHeader from "../UserHeader/UserHeader";
import { FormattedMessage } from "react-intl";
import { year } from "./consts/HeaderConst";
import SwitchButton from "../SwitchButton/SwitchButton";
import useAuth from "../../../../auth/hooks/useAuth";

/** Component Header */

const Header = () => {
    const refHeader = React.useRef<HTMLDivElement>(null);
    const auth = useAuth()?.auth;

    return (
        <div ref={refHeader} className={styles.Layout__header} id="Header">
            <div className={styles.HeaderContainer}>
                <div>
                    <Link href="/">
                        <Image src={logo} alt="" />
                    </Link>
                </div>
                <MediaQuery minWidth={1230}>
                    <div className={styles.Header}>
                        <Link
                            href="https://www.ivi.ru/"
                            className={styles.Header__p}
                        >
                            <FormattedMessage id="MyIvi" />
                        </Link>
                        <Link
                            href="https://www.ivi.ru/new"
                            className={styles.Header__p}
                        >
                            <FormattedMessage id="WhatNew" />
                        </Link>
                        <HeaderWindow name={<FormattedMessage id="Films" />}>
                            <WindowFilm year={year} />
                        </HeaderWindow>
                        <HeaderWindow name={<FormattedMessage id="Serials" />}>
                            <WindowFilm year={year} />
                        </HeaderWindow>
                        <HeaderWindow name={<FormattedMessage id="Cartoons" />}>
                            <WindowFilm year={year} />
                        </HeaderWindow>
                    </div>
                </MediaQuery>
            </div>
            <div className={styles.Header__button}>
                <MyButton>
                    <FormattedMessage id="PayForASubscription" />
                </MyButton>
                <MediaQuery minWidth={1230}>
                    <SearchWindow />
                </MediaQuery>
                <MediaQuery minWidth={750}>
                    <HeaderWindow
                        link={true}
                        name={
                            <div className={styles.User}>
                                {auth?.token ? (
                                    auth.userEmail[0].toUpperCase()
                                ) : (
                                    <Image src={user} alt="" />
                                )}
                            </div>
                        }
                    >
                        <UserHeader />
                    </HeaderWindow>
                </MediaQuery>
                <SwitchButton />
            </div>
        </div>
    );
};

export default Header;
