import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLang, langAction } from "../../../../../store/switchLang";
import styles from "./SwitchButton.module.scss";

const SwitchButton = () => {
    const [visible, setVisible] = useState<boolean>();
    const lang = useSelector(getLang());
    const dispatch = useDispatch();

    const switchLang = (langType: string) => {
        dispatch(langAction(langType));
    };

    const hoverVisible = (bol: boolean) => {
        setVisible(bol);
    };
    return (
        <>
            <div
                onMouseOver={() => hoverVisible(true)}
                onMouseOut={() => hoverVisible(false)}
                onClick={() => hoverVisible(!visible)}
                className={styles.SwitchButton}
            >
                <p className={styles.SwitchButton__text}>{lang}</p>
                {visible ? (
                    <div className={styles.SwitchButton__window}>
                        <button onClick={() => switchLang("Ru")}>
                            <p>Ru</p>
                        </button>
                        <button onClick={() => switchLang("En")}>
                            <p>En</p>
                        </button>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default SwitchButton;
