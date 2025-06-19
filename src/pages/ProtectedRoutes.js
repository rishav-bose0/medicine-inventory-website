// ProtectedRoutes.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useAuth} from "./context/AuthContext";

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth(); // Get authentication status
    console.log(isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;