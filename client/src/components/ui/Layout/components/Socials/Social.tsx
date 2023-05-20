import React from "react";
import MyButton from "../../../../common/MyButton/MyButton";
import Image from "next/image";
import vk from "../../../../../assets/SVG/Messangers/VK.svg";
import twitter from "../../../../../assets/SVG/Messangers/Twiiter.svg";
import telegram from "../../../../../assets/SVG/Messangers/Telegram.svg";
import styles from "./Social.module.scss";

const Social = () => {
    return (
        <div className={styles.Social}>
            <MyButton type="footer" figure="circle">
                <Image alt="" src={vk} />
            </MyButton>
            <MyButton type="footer" figure="circle">
                <Image alt="" src={twitter} />
            </MyButton>
            <MyButton type="footer" figure="circle">
                <Image alt="" src={telegram} />
            </MyButton>
        </div>
    );
};

export default Social;
