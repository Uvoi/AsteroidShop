import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkSession } from '../../../functions/user';
import Loading from '../../Loading/Loading';

const RequireAuth = ({ children, additionalCondition=null }) => {
    const [auth, setAuth] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const result = await checkSession();
                setAuth(result);
            } catch (error) {
                console.error("Session error:", error);
                setAuth(false);
            }
        };

        verifyAuth();
    }, []);

    if (auth === null) {
        return <Loading />;
    }

    if (auth) {
        let additional = additionalCondition&&additionalCondition()
        if ((additionalCondition && additional===true) || (!additionalCondition))
            return children;
        else
            return additional
    } else {
        return <Navigate to='/login' state={{ from: location }} />;
    }
};

export default RequireAuth;
