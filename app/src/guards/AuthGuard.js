import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const AuthGuard = ({ auth, redirectTo }) => {
    return auth ? <Outlet /> : <Navigate to={redirectTo} />;
};
export default AuthGuard;