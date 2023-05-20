import React, { useEffect, useState } from "react";
import { axiosAuth } from "../../../lib/axios";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { AxiosError, AxiosResponse } from "axios";
import { AuthContextData } from "../context/interfaces";
import InputField from "../components/InputField/InputField";
import jwtDecode from "jwt-decode";
import FormAuth from "../components/FormAuth/FormAuth";
import setUserDataToLS from "../../../utils/setUserDataToLS";
import { useSelector } from "react-redux";
import { getLang } from "../../../store/switchLang";
import setAccessTokenToLS from "../../../utils/setAccessTokenToLS";

const AUTH = {
    login: "/auth/login",
    register: "/auth/registration"
};

export default function LoginForm() {
    const setAuth = useAuth()?.setAuth;
    const router = useRouter();
    const lang = useSelector(getLang());

    const [, setActionType] = useState(AUTH.login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const { asPath } = router;

    useEffect(() => {
        const handleActionType = () => {
            if (asPath === AUTH.login) {
                setActionType(AUTH.login);
            } else {
                setActionType(AUTH.register);
            }
        };

        handleActionType();
    }, [asPath]);

    useEffect(() => {
        setError("");
    }, [email, password]);

    const handleSignInCredentials = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!email || !password) {
            setError(
                lang === "Ru"
                    ? "Не указан логин или пароль"
                    : "Username or password is not specified"
            );
            return;
        }
        try {
            const response: AxiosResponse<AuthContextData> =
                await axiosAuth.post("/api/auth/login", {
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
            } else {
                setError(
                    lang === "Ru"
                        ? "Неверный логин или пароль"
                        : "Invalid username or password"
                );
            }
        }
    };
    return (
        <>
            <FormAuth error={error} handleSubmit={handleSignInCredentials}>
                <InputField
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
                <InputField
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
            </FormAuth>
        </>
    );
}
