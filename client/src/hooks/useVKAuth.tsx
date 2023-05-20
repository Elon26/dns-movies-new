import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { axiosAuth } from "../lib/axios";
import { AxiosError } from "axios";
import { IAuthResponse, IProfileResponse } from "../models";
import jwtDecode from "jwt-decode";
import useAuth from "../components/auth/hooks/useAuth";
import setUserDataToLS from "../utils/setUserDataToLS";
import setAccessTokenToLS from "../utils/setAccessTokenToLS";

interface IVKAuthContextProps {
    data: null;
}

const defaultData = {
    data: null
};

const vkAuthContext = React.createContext<IVKAuthContextProps>(defaultData);

/** Кастомный хук, отлавливающий завершение авторизации, при помощи функционала "В контакте" и создающий соответствующую учётную запись на сервере. */
export const useVKAuth = () => {
    return useContext(vkAuthContext);
};

const VKAuthProvider = ({ children }: { children: React.ReactElement }) => {
    const router = useRouter();
    const pathname = router.pathname;
    const asPath = router.asPath;
    const setAuth = useAuth()?.setAuth;

    /** Функция получает vk-код и адресной строки браузера. */
    function getCodeFromPath(path: string): string | null {
        if (path.includes("code=") && path.includes("state=")) {
            const startIndex = path.indexOf("code=");
            const codeWithOtherQuery = path.slice(startIndex + 5);
            const endIndex = codeWithOtherQuery.indexOf("&");
            const code = codeWithOtherQuery.slice(0, endIndex);
            return code;
        }
        return null;
    }

    /** Функция выполняет набор действий по завершению авторизации через vk. */
    async function finishVKAuth(vkKode: string): Promise<void> {
        try {
            const response: IAuthResponse = await axiosAuth.post(
                `api/auth/vk`,
                { code: vkKode }
            );

            const token = response.data.token;
            const decode: { email: string; roles: { name: string }[] } =
                jwtDecode(token);

            let userEmail = decode.email;
            try {
                if (!userEmail) {
                    const profResp: IProfileResponse = await axiosAuth.get(
                        `api/profiles/me`,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    const identifier =
                        profResp.data.username ||
                        profResp.data.name ||
                        profResp.data.lastName;
                    userEmail = identifier as string;
                }
            } catch (error) {
                console.log(error);
            }

            const userRoles = decode.roles.map((elem) => elem.name);
            setUserDataToLS(userEmail, userRoles);
            setAccessTokenToLS(token);
            setAuth && setAuth({ token, userEmail, userRoles });

            await router.push("/");
        } catch (e: unknown) {
            console.log(e);

            const error = e as AxiosError;

            if (!error.response) {
                console.log("Нет ответа сервера");
            } else if (error.response.status === 400) {
                console.log("Неверный логин или пароль");
            } else {
                console.log("Ошибка авторизации");
            }
        }
    }

    /** Функционал запускает завершение vk-авторизации при получении в адресную строку соответствующих параметров. */
    useEffect(() => {
        const handleVKAuth = async () => {
            const vkKode = getCodeFromPath(asPath);

            if (vkKode) {
                await finishVKAuth(vkKode);
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = handleVKAuth();
    }, [pathname]);

    return (
        <vkAuthContext.Provider
            value={{
                data: null
            }}
        >
            <div>{children}</div>
        </vkAuthContext.Provider>
    );
};

export default VKAuthProvider;
