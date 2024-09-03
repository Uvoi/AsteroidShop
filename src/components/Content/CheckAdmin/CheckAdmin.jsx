import React, { useState, useEffect } from 'react';
import { isUserAdmin } from '../../../functions/user';
import Loading from '../../Loading/Loading';
import Empty from '../../../pages/Empty/Empty';
import RequireAuth from '../RequireAuth/RequireAuth'; // Предполагаем, что RequireAuth уже существует

const IsAdmin = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const result = await isUserAdmin();
                setIsAdmin(result);
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(false);
            }
        };

        checkAdminStatus();
    }, []);

    if (isAdmin === null) {
        return <Loading />;
    }

    if (isAdmin) {
        return children;
    } else {
        return <Empty />;
    }
};

const CheckAdmin = ({ children }) => {
    return (
        <RequireAuth>
            <IsAdmin>
                {children}
            </IsAdmin>
        </RequireAuth>
    );
};

export default CheckAdmin;
