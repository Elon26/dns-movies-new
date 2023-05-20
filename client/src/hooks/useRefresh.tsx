import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CURRENT_USER_DATA } from "../constats";
import { axiosAuth } from "../lib/axios";
import { wrapAsyncFunction } from "../utils/wrapAsyncFunction";
import { IAuthResponse } from "../models";
import jwtDecode from "jwt-decode";
import useAuth from "../components/auth/hooks/useAuth";
import setAccessTokenToLS from "../utils/setAccessTokenToLS";

interface IRefreshContextProps {
    data: null;
}

const defaultData = {
    data: null
};

const refreshContext = React.createContext<IRefreshContextProps>(defaultData);

/** Кастомный хук проверяющий наличие сохраненного в LS объекта пользователя и запускающий процедуру повторной авторизации, при его наличии. */
export const useRefresh = () => {
    return useContext(refreshContext);
};

const RefreshProvider = ({ children }: { children: React.ReactElement }) => {
    const accessTokenLifetime = 900000;
    const router = useRouter();
    const setAuth = useAuth()?.setAuth;
    const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

    /** Функция обновляет рефреш-токен, если пользователь был авторизован ранее, при первом запуске приложения (с любой страницы), а также при смене роута, если с прошлого обновления прошло 15 минут и более */
    async function refresh(): Promise<void> {
        const LSItem = localStorage.getItem(CURRENT_USER_DATA);

        if (LSItem && Date.now() >= lastRefreshTime + accessTokenLifetime) {
            const response: IAuthResponse = await axiosAuth.post(
                "/api/auth/refresh"
            );
            const token = response.data.token;
            const decode: { email: string; roles: { name: string }[] } =
                jwtDecode(token);
            const userEmail = decode.email || "default@mail.grulovia";
            const userRoles = decode.roles.map((elem) => elem.name);
            setAuth && setAuth({ token, userEmail, userRoles });
            setLastRefreshTime(Date.now());
            setAccessTokenToLS(token);
        }
    }

    /** Функция выполняет инициализацию приложения */
    async function init(): Promise<void> {
        try {
            await axiosAuth.get("/api/init");
        } catch (error) {
            console.log("Инициализация уже выполнена", error);
        }
    }

    /** Функционал вызывает инициализацию приложения при первом его запуске,  а также обновление токена при каждом изменении роута и по мере устаревания access-токена. */
    useEffect(wrapAsyncFunction(init), []);
    useEffect(wrapAsyncFunction(refresh), [router.pathname]);
    setInterval(wrapAsyncFunction(refresh), accessTokenLifetime);

    return (
        <refreshContext.Provider
            value={{
                data: null
            }}
        >
            <div>{children}</div>
        </refreshContext.Provider>
    );
};

export default RefreshProvider;
