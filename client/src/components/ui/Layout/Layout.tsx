import styles from "./Layout.module.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import React from "react";
import Tab from "./components/Tab/Tab";
import MediaQuery from "react-responsive";

interface ILayout {
    children: React.ReactNode;
}

/** Компонент шаблон Header'a и Footer'a */

const Layout = ({ children }: ILayout): React.ReactElement => {
    return (
        <div className={styles.Layout}>
            <div className={styles.Content}>
                <div className={styles.Layout__headerContainer}>
                    <Header />
                </div>
                {children}
                <MediaQuery maxWidth={1235}>
                    <Tab />
                </MediaQuery>
            </div>
            <MediaQuery minWidth={1236}>
                <div className={styles.Layout__footer}>
                    <Footer />
                </div>
            </MediaQuery>
        </div>
    );
};

export default Layout;
