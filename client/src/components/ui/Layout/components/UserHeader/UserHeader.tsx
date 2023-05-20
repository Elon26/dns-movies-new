import Image from "next/image";
import MyButton from "../../../../common/MyButton/MyButton";
import styles from "./UserHeader.module.scss";
import share from "../../../../../assets/SVG/Share/Share.svg";
import bankCard from "../../../../../assets/SVG/Card/BankCard.svg";
import tv from "../../../../../assets/SVG/Tv/Tv.svg";
import reward from "../../../../../assets/SVG/Reward/Reward.svg";
import diamond from "../../../../../assets/SVG/Diamond/Diamond.svg";
import history from "../../../../../assets/SVG/History/History.svg";
import bookmark from "../../../../../assets/SVG/Bookmark/Bookmark.svg";
import youtube from "../../../../../assets/SVG/Youtube/Youtube.svg";
import React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "../../../../auth/hooks/useAuth";
import LogoutButton from "../../../../auth/components/LogoutButton/LogoutButton";

/** Компонент всплывающего пользователя в Header */

const UserHeader = () => {
    const router = useRouter();
    const auth = useAuth()?.auth;
    return (
        <div className={styles.UserContainer}>
            <div className={styles.User__block}>
                <div className={styles.User__div}>
                    <Image src={youtube} alt="" />
                    <p className={styles.User__p}>
                        <FormattedMessage id="Purchases" />
                    </p>
                </div>
                <div className={styles.User__div}>
                    <Image src={bookmark} alt="" />
                    <p className={styles.User__p}>
                        <FormattedMessage id="WatchLater" />
                    </p>
                </div>
                <div className={styles.User__div}>
                    <Image src={history} alt="" />
                    <p className={styles.User__p}>
                        <FormattedMessage id="BrowsingHistory" />
                    </p>
                </div>
                <div className={styles.User__div}>
                    <Image src={diamond} alt="" />
                    <p className={styles.User__p}>
                        <FormattedMessage id="Subscriptions" />
                    </p>
                </div>
                <div className={styles.User__div}>
                    <Image src={reward} alt="" />
                    <p className={styles.User__p}>
                        <FormattedMessage id="CertificateActivation" />
                    </p>
                </div>
                <div className={styles.User__div}>
                    <Image src={tv} alt="" />
                    <p className={styles.User__p}>
                        <FormattedMessage id="LoginByCode" />
                    </p>
                </div>
                <div className={styles.User__div}>
                    <Image src={bankCard} alt="" />
                    <p className={styles.User__p}>
                        <FormattedMessage id="PaymentMethods" />
                    </p>
                </div>
                <div className={styles.User__div}>
                    <Image src={share} alt="" />
                    <p className={styles.User__p}>
                        <FormattedMessage id="InviteFriends" />
                    </p>
                </div>
            </div>
            <div className={styles.User__auth}>
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
            </div>
        </div>
    );
};

export default UserHeader;
