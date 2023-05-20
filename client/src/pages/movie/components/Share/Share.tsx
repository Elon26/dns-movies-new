import React, { useState } from "react";
import MyButton from "../../../../components/common/MyButton/MyButton";
import Image from "next/image";
import download from "../../../../assets/SVG/Download/Download.svg";
import styles from "./Share.module.scss";
import { useSelector } from "react-redux";
import { getFilm } from "../../../../store/film";
import { FormattedMessage } from "react-intl";
import { getLang } from "../../../../store/switchLang";
import Modal from "../../../../components/common/Modal/Modal";

const copy = () => {
    const url = window.location.href;
    let copyText = document.getElementById("idName");
    if (!copyText) {
        const div: HTMLInputElement = document.createElement("input");
        div.value = url;
        div.setAttribute("id", "idName");
        document.body.append(div);
        console.log(copyText);
        div.style.opacity = "0";
    }
    copyText = document.getElementById("idName");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    copyText?.select();
    document.execCommand("copy");
};

const Share = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const film = useSelector(getFilm());
    const lang = useSelector(getLang());
    return (
        <>
            <MyButton
                onClick={() => setVisible(true)}
                type="footer"
                size="mini"
                testid="share-btn"
            >
                <Image src={download} width={25} height={25} alt="" />
            </MyButton>
            <Modal
                data-testid="modalShared"
                visible={visible}
                callback={() => setVisible(false)}
            >
                <div data-testid="modalShared" className={styles.Share}>
                    <div className={styles.Share__info}>
                        <Image
                            src={film?.film?.posterUrl || ""}
                            alt=""
                            width={43}
                            height={66}
                        />
                        <div>
                            <h2>
                                {lang === "Ru" ||
                                film?.film?.nameOriginal == null
                                    ? film?.film?.nameRu
                                    : film?.film?.nameOriginal}
                            </h2>
                            <p>{film?.film?.year} • 1 ч. 46 мин.</p>
                        </div>
                    </div>
                    <div className={styles.Share__button}>
                        <MyButton
                            onClick={() => {
                                copy();
                                setVisible(false);
                            }}
                            type="footer"
                            size="large"
                        >
                            <FormattedMessage id="CopyLink" />
                        </MyButton>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Share;
