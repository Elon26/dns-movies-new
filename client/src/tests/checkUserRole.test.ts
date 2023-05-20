import { CURRENT_USER_DATA } from "../constats";
import checkUserRole from "../utils/checkUserRole";

/** Тест проверяет корректность проверки пользовательской роли авторизованного пользователя. */
describe("checkUserRole", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    test("checkOwner", () => {
        const ownerData = {
            email: "superuser@superuser.com",
            roles: ["USER", "OWNER"]
        };
        localStorage.setItem(CURRENT_USER_DATA, JSON.stringify(ownerData));
        expect(checkUserRole()).toEqual(true);
    });

    test("checkAdmin", () => {
        const adminData = {
            email: "admin@admin.com",
            roles: ["USER", "ADMIN"]
        };
        localStorage.setItem(CURRENT_USER_DATA, JSON.stringify(adminData));
        expect(checkUserRole()).toEqual(true);
    });

    test("checkAdmin", () => {
        const userData = {
            email: "user@user.com",
            roles: ["USER"]
        };
        localStorage.setItem(CURRENT_USER_DATA, JSON.stringify(userData));
        expect(checkUserRole()).toEqual(false);
    });
});
