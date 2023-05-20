import style from "./Footer.module.scss";
import MyButton from "../../../../common/MyButton/MyButton";
import React from "react";
import { FormattedMessage } from "react-intl";
import { BsEnvelope, BsMegaphone, BsTelephone } from "react-icons/bs";
import Social from "../Socials/Social";
import Apps from "../Apps/Apps";

/** Component Footer */
const Footer = () => {
    return (
        <footer className={style.Footer}>
            <div className={style.Footer__about}>
                <div className="Footer__company">
                    <h4>
                        <FormattedMessage id="AboutUs" />
                    </h4>
                    <p>
                        <FormattedMessage id="AboutCompany" />
                    </p>
                    <p>
                        <FormattedMessage id="ProgrammBetaTesting" />
                    </p>
                    <p>
                        <FormattedMessage id="InformationForPartners" />
                    </p>
                    <p>
                        <FormattedMessage id="AdvertisingPlacement" />
                    </p>
                    <p>
                        <FormattedMessage id="TermsOfUse" />
                    </p>
                    <p>
                        <FormattedMessage id="PrivacyPolicy" />
                    </p>
                    <p>
                        <FormattedMessage id="Compliance" />
                    </p>
                </div>
                <div className={style.Footer__sections}>
                    <h4>
                        <FormattedMessage id="Section" />
                    </h4>
                    <p>
                        <FormattedMessage id="MyIvi" />
                    </p>
                    <p>
                        <FormattedMessage id="WhatNew" />
                    </p>
                    <p>
                        <FormattedMessage id="Films" />
                    </p>
                    <p>
                        <FormattedMessage id="Serials" />
                    </p>
                    <p>
                        <FormattedMessage id="Cartoons" />
                    </p>
                    <p>TV+</p>
                    <p>
                        <FormattedMessage id="WhatToSee" />
                    </p>
                    <span className={style.Footer__span}>
                        <FormattedMessage id="CertificateActivation" />
                    </span>
                </div>
                <div className={style.Footer__service}>
                    <h4>
                        <FormattedMessage id="Support" />
                    </h4>
                    <p>
                        <FormattedMessage id="WeAreAlwaysReadyToHelpYou" />
                        <br />
                        <FormattedMessage id="OurOperatorsAreOnline" />
                    </p>
                    <MyButton type="footer">
                        <FormattedMessage id="WriteInChat" />
                    </MyButton>
                    <div className={style.Footer__buttons}>
                        <MyButton type="footer" size="mini">
                            <BsTelephone />
                        </MyButton>
                        <MyButton type="footer" size="mini">
                            <BsEnvelope />
                        </MyButton>
                    </div>
                    <h4>ask.ivi</h4>
                    <p>
                        <FormattedMessage id="AnswersOnQuestions" />
                    </p>
                </div>
                <div className={style.Footer__advertising}>
                    <div className={style.Footer__square}>
                        <BsMegaphone />
                    </div>
                    <div>
                        <p>
                            <FormattedMessage id="WatchMovies" />
                        </p>
                    </div>
                </div>
            </div>
            <div className={style.Footer__apps}>
                <Apps />
                <Social />
            </div>
        </footer>
    );
};

export default Footer;
