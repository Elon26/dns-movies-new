import { CURRENT_USER_DATA } from "../constats";
import { ILSData } from "../models";

/** Фунция проверяет, есть ли у авторизованного пользователя роль администратора или владельца сервера. */
function checkUserRole(): boolean {
    const dataFromLS = localStorage.getItem(CURRENT_USER_DATA);
    if (dataFromLS) {
        const objFromLS = JSON.parse(dataFromLS) as ILSData;
        if (objFromLS.roles.includes("ADMIN")) return true;
        if (objFromLS.roles.includes("OWNER")) return true;
        return false;
    }
    return false;
}

export default checkUserRole;
