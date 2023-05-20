import axios, { axiosAuth } from "../lib/axios";
import { IAuthResponse } from "../models";

/** Функция добавляет роль администратора пользователю, с указанным email. */
async function addAdminRole(email: string): Promise<void> {
    try {
        const tokenResponse: IAuthResponse = await axiosAuth.post(
            "/api/auth/refresh"
        );
        const token = tokenResponse.data.token;

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };

        const response = await axios.post(
            "api/users/add_role",
            {
                email,
                roleName: "ADMIN"
            },
            { headers }
        );
        console.log("response", response);
    } catch (error) {
        console.log(error);
    }
}

export default addAdminRole;
