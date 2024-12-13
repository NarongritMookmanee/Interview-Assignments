import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from './services/tokenServices';

function PrivateRoute() {
    return isTokenValid() ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute;