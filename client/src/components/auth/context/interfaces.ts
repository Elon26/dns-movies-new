export interface AuthContextData {
    token: string;
    userEmail: string;
    userRoles: string[];
}
export interface IAuthContext {
    readonly auth: AuthContextData | null;
    readonly setAuth: (auth: AuthContextData) => void;
}
