import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export function useAuthContext(){
    const context = useContext(AuthContext)
    return context
}