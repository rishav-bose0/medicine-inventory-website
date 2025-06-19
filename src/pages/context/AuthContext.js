// AuthContext.js
import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    // lazy-initialize from localStorage (or null)
    const [token, setToken] = useState(
        () => localStorage.getItem('token')
    )
    const [user, setUser] = useState(
        () => JSON.parse(localStorage.getItem('user'))
    )

    const login = (userData) => {
        localStorage.setItem('token', userData.id)
        localStorage.setItem('user', JSON.stringify(userData))
        setToken(userData.id)
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    const isAuthenticated = Boolean(token)
    return (
        <AuthContext.Provider value={{isAuthenticated, user,  login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);