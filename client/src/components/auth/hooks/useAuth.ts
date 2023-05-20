import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const { auth } = useContext(AuthContext);

    if (!auth) return null;
    return useContext(AuthContext);
};

export default useAuth;
