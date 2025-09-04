import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/userServices";
export const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {
    const [user, setUser ] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await getCurrentUser();
                setUser(res);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkLogin();
    },[])

    return (
        <AuthContext.Provider value={ {user, setUser, loading} }>
            {children}
        </AuthContext.Provider>
    )
}