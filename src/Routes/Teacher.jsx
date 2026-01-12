import React from 'react';
import { useAuth } from '../context/AuthProvider';

const Teacher = ({ children }) => {
    const {user} = useAuth();

    if (user?.role != 'teacher') {
        return (
            <div className="alert alert-error max-w-xl mx-auto mt-10">
                Access denied. Teacher role required.
            </div>
        );
    }

    return children;
};

export default Teacher;