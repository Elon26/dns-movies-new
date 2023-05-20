import React from "react";
import styles from "./OauthField.module.scss";
import {
    GoogleOAuthProvider,
    GoogleLogin,
    CredentialResponse
} from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../../../../constants-env";
import jwtDecode from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { useRouter } from "next/router";
import setUserDataToLS from "../../../../utils/setUserDataToLS";
import { axiosAuth } from "../../../../lib/axios";
import { AxiosError } from "axios";
import catchError from "../../../../utils/catchError";
import { IAuthResponse } from "../../../../models";
import setAccessTokenToLS from "../../../../utils/setAccessTokenToLS";

/** Компонент авторизации, при помощи Google. */
const GoogleAuth = (): React.ReactElement => {
    const router = useRouter();
    const setAuth = useAuth()?.setAuth;

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className={styles.buttonWrapper}>
                <GoogleLogin
                    onSuccess={async (
                        credentialResponse: CredentialResponse
                    ) => {
                        try {
                            const response: IAuthResponse =
                                await axiosAuth.post(`api/auth/google`, {
                                    token: credentialResponse.credential
                                });

                            const token = response.data.token;
                            const decode: {
                                email: string;
                                roles: { name: string }[];
                            } = jwtDecode(token);
                            const userEmail = decode.email;
                            const userRoles = decode.roles.map(
                                (elem) => elem.name
                            );
                            setAuth && setAuth({ token, userEmail, userRoles });
                            setUserDataToLS(userEmail, userRoles);
                            setAccessTokenToLS(token);
                            await router.push("/");
                        } catch (e) {
                            const error = e as AxiosError;
                            catchError(error);
                        }
                    }}
                    onError={() => {
                        console.log("Ошибка авторизации");
                    }}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
