import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [permissions, setPermissions] = useState(['dashboard','service_provider','configaration','category','city','location','serviceprovider','event_manager','event']);

    return (
        <AuthContext.Provider value={{ permissions }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
