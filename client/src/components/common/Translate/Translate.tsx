import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getLang } from "../../../store/switchLang";

const Translate: FC<{ engl: string | null; rus: string }> = ({ engl, rus }) => {
    const lang = useSelector(getLang());

    return <>{engl && lang === "En" ? engl : rus}</>;
};

export default Translate;
