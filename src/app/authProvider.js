import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiPaths from '../api/ApiPaths';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = sessionStorage.getItem('loginToken');
    const permissionSet = {
        user: [
            'dashboard', 'service_provider', 'configuration', 'location', 'serviceprovider', 
            'event_manager', 'event', 'country', 'advertisement', 'advertisement_manager', 
            'user_manager', 'usermanager', 'category', 'city','notification'
        ],
        admin: [
            'dashboard', 'service_provider', 'configuration', 'location', 'serviceprovider', 
            'event_manager', 'event', 'country', 'advertisement', 'advertisement_manager', 
            'user_manager', 'usermanager', 'category', 'city','notification'
        ],
        serviceprovider: [
            'dashboard', 'configuration', 'location', 
            'event_manager', 'event', 'country', 'advertisement', 'advertisement_manager','category', 'city','notification'
        ]
    };
    const role = 'admin';
    const [permissions, setPermissions] = useState(permissionSet[role]);


    return (
        <AuthContext.Provider value={{ permissions }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
