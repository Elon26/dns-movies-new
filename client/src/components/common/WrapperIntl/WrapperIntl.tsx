import English from "../../../languages/es-US.json";
import Russian from "../../../languages/es-RU.json";
import React, { FC, useState, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { getLang } from "../../../store/switchLang";

const WrapperIntl: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [langs, setLang] = useState(English);

    const local = useSelector(getLang());
    useEffect(() => {
        if (local === "En") {
            setLang(English);
        } else if (local === "Ru") {
            setLang(Russian);
        }
    }, [local]);

    return (
        <IntlProvider locale={local} messages={langs}>
            {children}
        </IntlProvider>
    );
};

export default WrapperIntl;
