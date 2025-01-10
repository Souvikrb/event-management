import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

const ProtectedRoute = ({ children, permission,setPermissions }) => {
    const { permissions } = useAuth();
    const token = sessionStorage.getItem('loginToken');
    const permissionSet = {
        user: [
            'dashboard', 'service_provider', 'configuration', 'location', 'serviceprovider', 
            'event_manager', 'event', 'country', 'advertisement', 'advertisement_manager', 
            'user_manager', 'usermanager', 'category', 'city'
        ],
        admin: [
            'dashboard', 'service_provider', 'configuration', 'location', 'serviceprovider', 
            'event_manager', 'event', 'country', 'advertisement', 'advertisement_manager', 
            'user_manager', 'usermanager', 'category', 'city'
        ],
        serviceprovider: [
            'dashboard', 'configuration', 'location', 
            'event_manager', 'event', 'country', 'advertisement', 'advertisement_manager','category', 'city'
        ]
    };
    if(!token){
        return <Navigate to="/login" />;
    }
    if (!permissions.includes(permission)) {
        console.log(permissions);
       //return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
