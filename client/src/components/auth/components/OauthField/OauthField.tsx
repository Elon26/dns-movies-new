import React from "react";
import GoogleAuth from "./GoogleAuth";
import VKAuth from "./VKAuth";

/** Компонент с кнопками Oauth-авторизации . */
const OauthField = (): React.ReactElement => {
    return (
        <>
            <GoogleAuth />
            <VKAuth />
        </>
    );
};

export default OauthField;
