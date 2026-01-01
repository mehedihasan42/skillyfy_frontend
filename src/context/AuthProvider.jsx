import { createContext, useContext, useState, useEffect } from "react";
import { registerUser, loginUser } from "../services/authServices";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem("accessToken")
    );

    // Load user on refresh
    useEffect(() => {
        if (token) {
            setUser(JSON.parse(localStorage.getItem("user")));
        }
    }, [token]);

        const register = async (userData) => {
       try{
        const res = await registerUser(userData);
        localStorage.setItem("accessToken", res.access);
        localStorage.setItem("refreshToken", res.refresh);
        localStorage.setItem("user", JSON.stringify(res.user));

        setToken(res.access);
        setUser(res.user);
        return res;
       }
       catch(error){
        console.log(error.response.data);
        throw error;
       }
    };

    const login = async (userData) => {
       try{
        const res = await loginUser(userData);
        localStorage.setItem("accessToken", res.access);
        localStorage.setItem("refreshToken", res.refresh);
        localStorage.setItem("user", JSON.stringify(res.user));
        setToken(res.access);
        setUser(res.user);
        return res;
       }
         catch(error){
        console.log(error.response.data);
        throw error;
       }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
