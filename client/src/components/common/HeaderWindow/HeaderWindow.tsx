import styles from "./HeaderWindow.module.scss";
import Portal from "../Portals/Portal";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface IHeaderWindow {
    children: React.ReactNode;
    name: string | React.ReactNode;
    ref?: HTMLDivElement;
    link?: boolean;
}

/** Компонент окно всплывающего окна в Header */

const HeaderWindow = ({ children, name, link }: IHeaderWindow) => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const router = useRouter();
    function switchVisible(bol: boolean) {
        setVisible(bol);
    }

    useEffect(() => {
        setVisible(false);
    }, [router.asPath]);

    return (
        <div
            onMouseOver={() => switchVisible(true)}
            onMouseOut={() => switchVisible(false)}
            className={styles.Logo}
        >
            {!link ? (
                <Link href="/movies/all">
                    <div className={styles.Logo__p}>{name}</div>
                </Link>
            ) : (
                <div className={styles.Logo__p}>{name}</div>
            )}
            <Portal>
                <div
                    className={styles.Window}
                    style={{
                        opacity: visible ? 1 : 0,
                        zIndex: visible ? 1 : -10,
                        visibility: visible ? "visible" : "hidden",
                        transition: "0.3s"
                    }}
                >
                    {visible ? children : children}
                </div>
            </Portal>
        </div>
    );
};

export default HeaderWindow;
