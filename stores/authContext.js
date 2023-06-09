import { createContext, useEffect, useState } from "react";
import netlifyIdentity from 'netlify-identity-widget';

export const AuthContext = createContext({
    user: null, 
    login: () => {},
    logout: () => {}, 
    authReady: false, 
});

export const AuthContextProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        netlifyIdentity.on('login', handleLogin);
        netlifyIdentity.on('logout', handleLogout);
        netlifyIdentity.on('init', handleInit);

        netlifyIdentity.init();

        return () => {
        netlifyIdentity.off('login', handleLogin);
        netlifyIdentity.off('logout', handleLogout);
        netlifyIdentity.off('init', handleInit);
        };
    }, []);

    const handleLogin = (user) => {
        setUser(user);
        netlifyIdentity.close();
        console.log('login event');
    };

    const handleLogout = () => {
        setUser(null);
        console.log('logout event');
    };

    const handleInit = (user) => {
        setUser(user);
        setAuthReady(true);
        console.log('init event');
    };

    const login = () => {
        netlifyIdentity.open();
    };

    const logout = () => {
        netlifyIdentity.logout();
        handleLogout(); // Manually update the user state
    };

    const context = { user, login, logout, authReady };

return (
    <AuthContext.Provider value={context}>
    {children}
    </AuthContext.Provider>
);
};
