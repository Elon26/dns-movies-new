import React from "react";
import FormAuthPageHeader from "../../components/auth/components/FormAuthPageHeader/FormAuthPageHeader";
import LoginForm from "../../components/auth/LoginForm/LoginForm";
import { useSelector } from "react-redux";
import { getLang } from "../../store/switchLang";
import PageSection from "../../components/common/PageContainers/PageSection/PageSection";

export default function Login() {
    const lang = useSelector(getLang());

    return (
        <PageSection>
            <FormAuthPageHeader
                title={lang === "Ru" ? "Войти в личный кабинет" : "Login"}
            />
            <LoginForm />
        </PageSection>
    );
}
