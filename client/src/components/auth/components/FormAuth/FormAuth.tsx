import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import ConfirmConfidential from "../ConfirmConfidential/ConfirmConfidential";
import ErrorBlock from "../ErrorBlock/ErrorBlock";
import InputFieldContainer from "../InputFieldContainer/InputFieldContainer";
import RedirectLink from "../RedirectLink/RedirectLink";
import RedirectLinkContainer from "../RedirectLinkContainer/RedirectLinkContainer";
import styles from "./FormAuth.module.scss";
import React from "react";
import FormContainer from "../FormContainer/FormContainer";
import { useRouter } from "next/router";
import OauthField from "../OauthField/OauthField";
import { useSelector } from "react-redux";
import { getLang } from "../../../../store/switchLang";

interface FormAuthProps {
    error: string;
    children: React.ReactNode;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AUTH = {
    login: "/auth/login",
    register: "/auth/registration"
};

export default function FormAuth({
    error,
    children,
    handleSubmit
}: FormAuthProps) {
    const { asPath } = useRouter();
    const lang = useSelector(getLang());

    return (
        <FormContainer>
            <ErrorBlock error={error} />
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <InputFieldContainer>
                    {children}

                    <ButtonSubmit
                        text={lang === "Ru" ? "Продолжить" : "Continue"}
                        type="submit"
                    />

                    <OauthField />

                    <ConfirmConfidential />
                    {asPath === AUTH.login ? (
                        <RedirectLinkContainer
                            title={
                                lang === "Ru" ? "Нет аккаунта?" : "No account?"
                            }
                        >
                            <RedirectLink
                                href={"/auth/registration"}
                                children={
                                    lang === "Ru"
                                        ? "Зарегистрироваться"
                                        : "Register"
                                }
                            />
                        </RedirectLinkContainer>
                    ) : (
                        <RedirectLinkContainer
                            title={
                                lang === "Ru"
                                    ? "Есть аккаунт?"
                                    : "Have an account?"
                            }
                        >
                            <RedirectLink
                                href={"/auth/login"}
                                children={lang === "Ru" ? "Войти" : "Login"}
                            />
                        </RedirectLinkContainer>
                    )}
                </InputFieldContainer>
            </form>
        </FormContainer>
    );
}
