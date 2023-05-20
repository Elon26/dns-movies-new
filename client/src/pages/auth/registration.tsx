import React from "react";
import FormAuthPageHeader from "../../components/auth/components/FormAuthPageHeader/FormAuthPageHeader";
import RegistrationForm from "../../components/auth/RegistrationForm/RegistrationForm";
import PageSection from "../../components/common/PageContainers/PageSection/PageSection";
import { useSelector } from "react-redux";
import { getLang } from "../../store/switchLang";

export default function Registration() {
    const lang = useSelector(getLang());

    return (
        <PageSection>
            <FormAuthPageHeader
                title={lang === "Ru" ? "Зарегистрироваться" : "Register"}
            />
            <RegistrationForm />
        </PageSection>
    );
}
