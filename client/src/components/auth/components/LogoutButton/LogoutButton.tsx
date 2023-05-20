import React from "react";
import { useRouter } from "next/router";
import AuthService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import { CURRENT_USER_DATA, FAKEIVI_ACCESS_TOKEN } from "../../../../constats";
import MyButton from "../../../common/MyButton/MyButton";
import { FormattedMessage } from "react-intl";

export default function LogoutButton() {
    const router = useRouter();
    const setAuth = useAuth()?.setAuth;

    const handleLogout = async () => {
        await AuthService.logout();
        setAuth && setAuth({ token: "", userEmail: "", userRoles: [] });
        document.cookie = "callbackUrl=/";
        localStorage.removeItem(CURRENT_USER_DATA);
        localStorage.removeItem(FAKEIVI_ACCESS_TOKEN);
        await router.push("/auth/login");
    };

    return (
        <MyButton type="pink" size="medium" onClick={handleLogout}>
            <FormattedMessage id="Exit" />
        </MyButton>
    );
}
