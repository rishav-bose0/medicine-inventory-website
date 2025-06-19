// ProtectedRoutes.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {useAuth} from "./context/AuthContext";

const AdminProtectedRoutes = () => {
    const { isAuthenticated, user } = useAuth(); // Get authentication status
    console.log(isAuthenticated);
    console.log(user);

    return isAuthenticated && user.is_admin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminProtectedRoutes;