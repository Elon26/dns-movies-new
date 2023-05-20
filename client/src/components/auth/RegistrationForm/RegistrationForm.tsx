import React, { useEffect, useState } from "react";
import { axiosAuth } from "../../../lib/axios";
import InputField from "../components/InputField/InputField";
import { useRouter } from "next/router";
import InputErrorBlock from "../components/InputErrorBlock/InputErrorBlock";
import FormAuth from "../components/FormAuth/FormAuth";
import { AxiosError, AxiosResponse } from "axios";
import { AuthContextData } from "../context/interfaces";
import jwtDecode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import setUserDataToLS from "../../../utils/setUserDataToLS";
import { getLang } from "../../../store/switchLang";
import { useSelector } from "react-redux";
import setAccessTokenToLS from "../../../utils/setAccessTokenToLS";

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PWD_REGEX = /^[a-zA-Z0-9А-я]{4,16}$/;

export default function RegistrationForm() {
    const setAuth = useAuth()?.setAuth;
    const router = useRouter();
    const lang = useSelector(getLang());

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState("");
    const [confirmPwdValid, setConfirmPwdValid] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
    }, [email, password, confirmPwd]);

    useEffect(() => {
        setEmailValid(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setPasswordValid(PWD_REGEX.test(password));
        setConfirmPwdValid(password === confirmPwd);
    }, [password, confirmPwd]);

    const handleSubmitRegistration = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (!EMAIL_REGEX.test(email)) {
            setError(lang === "Ru" ? "Некорректный email" : "Incorrect email");
            return;
        } else if (!password) {
            setError(lang === "Ru" ? "Введите пароль" : "Enter the password");
            return;
        } else if (!confirmPwd) {
            setError(
                lang === "Ru"
                    ? "Введите подтверждение пароля"
                    : "Enter password confirmation"
            );
            return;
        } else if (password !== confirmPwd) {
            setError(
                lang === "Ru"
                    ? "Введенные пароли не совпадают"
                    : "The entered passwords do not match"
            );
            return;
        }
        try {
            const response: AxiosResponse<AuthContextData> =
                await axiosAuth.post("/api/auth/registration", {
                    email,
                    password
                });

            const token = response?.data?.token;

            const decode: { email: string; roles: { name: string }[] } =
                jwtDecode(token);
            const userEmail = decode.email;
            const userRoles = decode.roles.map((elem) => elem.name);
            setAuth && setAuth({ token, userEmail, userRoles });
            setEmail("");
            setPassword("");
            setUserDataToLS(userEmail, userRoles);
            setAccessTokenToLS(token);
            await router.push("/");
        } catch (e) {
            const error = e as AxiosError;

            if (!error?.response) {
                setError(
                    lang === "Ru" ? "Нет ответа сервера" : "No server response"
                );
            } else if (error.response?.status === 409) {
                setError(
                    lang === "Ru"
                        ? "Указанный e-mail уже зарегистрирован"
                        : "The e-mail is already registered"
                );
            } else {
                setError(
                    lang === "Ru"
                        ? "Введены некорректные данные"
                        : "Incorrect data entered"
                );
            }
        }
    };

    return (
        <FormAuth error={error} handleSubmit={handleSubmitRegistration}>
            <InputField
                valid={emailValid}
                placeholder={
                    lang === "Ru" ? "Введите e-mail" : "Enter your e-mail"
                }
                type="email"
                value={email}
                id="email"
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
            />
            <div>
                <InputField
                    valid={passwordValid}
                    placeholder={
                        lang === "Ru" ? "Введите пароль" : "Enter your password"
                    }
                    value={password}
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />
                {!passwordValid && (
                    <InputErrorBlock
                        error={
                            lang === "Ru"
                                ? "Пароль должен содержать от 4 до 16 символов"
                                : "The password must contain from 4 to 16 chars"
                        }
                    />
                )}
            </div>
            <InputField
                valid={confirmPwdValid}
                placeholder={
                    lang === "Ru"
                        ? "Подтвердите пароль"
                        : "Confirm your password"
                }
                value={confirmPwd}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setConfirmPwd(e.target.value)
                }
            />
        </FormAuth>
    );
}
