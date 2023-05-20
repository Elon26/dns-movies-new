import { axiosAuth } from "../../../lib/axios";

const API_URL = "/api/auth/";

const register = (email: string, password: string) =>
    axiosAuth.post(API_URL + "registration", { email, password });
const login = (email: string, password: string) =>
    axiosAuth.post(API_URL + "login", { email, password });
const logout = () => axiosAuth.post(API_URL + "logout");
const refresh = () => axiosAuth.post(API_URL + "refresh");

const AuthService = {
    register,
    login,
    logout,
    refresh
};

export default AuthService;
