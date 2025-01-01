import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

const ProtectedRoute = ({ children, permission }) => {
    const { permissions } = useAuth();
    if (!permissions.includes(permission)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
