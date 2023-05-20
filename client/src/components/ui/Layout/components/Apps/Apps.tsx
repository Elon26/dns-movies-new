import React from "react";
import MyButton from "../../../../common/MyButton/MyButton";
import Image from "next/image";
import { FormattedMessage } from "react-intl";
import apple from "../../../../../assets/SVG/Apps/Apple.svg";
import google from "../../../../../assets/SVG/Apps/Google.svg";
import style from "./Apps.module.scss";

const Apps = () => {
    return (
        <div className={style.Apps}>
            <MyButton size="large" type="footer">
                <Image alt="" src={apple} />
                <div>
                    <p>
                        <FormattedMessage id="DownloadIn" />
                    </p>
                    <span>App Store</span>
                </div>
            </MyButton>
            <MyButton size="large" type="footer">
                <Image alt="" src={google} />
                <div>
                    <p>
                        <FormattedMessage id="AvailableIn" />
                    </p>
                    <span>Google Play</span>
                </div>
            </MyButton>
        </div>
    );
};

export default Apps;
