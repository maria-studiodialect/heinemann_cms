// src/hooks/useAuthentication.js

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../stores/authContext';

const useAuthentication = () => {
    const { user, authReady } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (authReady && !user) {
        router.push('/'); // Redirect to the index page or login page
        }
    }, [authReady, user, router]);

    return user;
};

export default useAuthentication;
