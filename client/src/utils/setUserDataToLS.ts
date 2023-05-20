import { CURRENT_USER_DATA } from "../constats";

/** Функция устанавливает данные авторизации в LocalStorage. */
function setUserDataToLS(email: string, roles: string[]): void {
    const objForLS = {
        email,
        roles
    };

    localStorage.setItem(CURRENT_USER_DATA, JSON.stringify(objForLS));
}

export default setUserDataToLS;
