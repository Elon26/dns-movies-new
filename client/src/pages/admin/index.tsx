import React from "react";
import Link from "next/link";
import MyButton from "../../components/common/MyButton/MyButton";
import { FormattedMessage } from "react-intl";
import MainContainer from "../../components/ui/MainContainer/MainContainer";
import { useSelector } from "react-redux";
import { getLang } from "../../store/switchLang";
import styles from "./admin.module.scss";

/** Компонент страницы администратора. */
const Admin = (): React.ReactElement => {
    const lang = useSelector(getLang());

    return (
        <MainContainer
            title={lang === "Ru" ? "Cтраница администратора" : "Admin Page"}
        >
            <section>
                <div className="container">
                    <div className={styles.wrapper}>
                        <Link href="admin/genres">
                            <MyButton type="pink" size="large">
                                <FormattedMessage id="ChangeGenre" />
                            </MyButton>
                        </Link>
                        <Link href="admin/movies">
                            <MyButton type="pink" size="large">
                                <FormattedMessage id="ChangeMovie" />
                            </MyButton>
                        </Link>
                    </div>
                </div>
            </section>
        </MainContainer>
    );
};

export default Admin;
