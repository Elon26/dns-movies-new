import React, { createContext, useState } from "react";
import { AuthContextData, IAuthContext } from "./interfaces";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
    auth: null,
    setAuth: () => null
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<AuthContextData>({} as AuthContextData);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
