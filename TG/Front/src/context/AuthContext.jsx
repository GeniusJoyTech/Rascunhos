import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
import { Api } from '../utils/api';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userS = localStorage.getItem("user")
        const tokenS = localStorage.getItem("token")
        if (userS && tokenS) {
            setToken(tokenS)
            setToken(JSON.parse(userS))
        }
    }, [])

    async function login(email, senha) {
        try {
            const response = await Api
                .post("/login", { email, senha })
            setToken(() => response.data.token)
            setUser(() => response.data.user)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{ login, user, token }}>
            {children}
        </AuthContext.Provider>
    )
}