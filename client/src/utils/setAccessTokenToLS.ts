import { FAKEIVI_ACCESS_TOKEN } from "../constats";

/** Функция устанавливает access-токен в LocalStorage. */
function setAccessTokenToLS(token: string): void {
    localStorage.setItem(FAKEIVI_ACCESS_TOKEN, token);
}

export default setAccessTokenToLS;
