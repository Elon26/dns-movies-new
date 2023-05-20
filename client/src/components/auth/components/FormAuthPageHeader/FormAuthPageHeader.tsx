import React from "react";
import ButtonClose from "../ButtonClose/ButtonClose";
import HorizontalLine from "../HorizontalLine/HorizontalLine";
import FormAuthPageTitle from "../FormAuthPageTitle/FormAuthPageTitle";
import styles from "./FormAuthPageHeader.module.scss";

interface FormAuthPageHeaderProps {
    title: string;
}

export default function FormAuthPageHeader({ title }: FormAuthPageHeaderProps) {
    return (
        <>
            <div className={styles.header}>
                <FormAuthPageTitle title={title} />
                <ButtonClose />
            </div>
            <HorizontalLine />
        </>
    );
}
