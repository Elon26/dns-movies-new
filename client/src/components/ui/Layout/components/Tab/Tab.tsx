import styles from "./Tab.module.scss";
import React from "react";
import Image from "next/image";
import tv from "../../../../../assets/SVG/Tv/Tv.svg";
import home from "../../../../../assets/SVG/Home/Home.svg";
import youtube from "../../../../../assets/SVG/Youtube/Youtube.svg";
import SearchWindow from "../SearchWindow/SearchWindow";
import Link from "next/link";
import NavigationWindow from "../NavigationWindow/NavigationWindow";
import { FormattedMessage } from "react-intl";

const Tab: React.FC = () => {
    return (
        <div className={styles.Container}>
            <div className={styles.Tab}>
                <Link href="https://www.ivi.ru/">
                    <div>
                        <Image src={home} alt="" />
                        <p>
                            <FormattedMessage id="MyIvi" />
                        </p>
                    </div>
                </Link>
                <Link href="/movies/all">
                    <div>
                        <Image src={youtube} alt="" />
                        <p>
                            <FormattedMessage id="Catalog" />
                        </p>
                    </div>
                </Link>
                <div>
                    <SearchWindow />
                </div>
                <div>
                    <Image src={tv} alt="" />
                    <p>Tv+</p>
                </div>
                <div className={styles.Tab__last}>
                    <NavigationWindow />
                </div>
            </div>
        </div>
    );
};

export default Tab;
