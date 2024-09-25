import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function ProtectedRoutes({children, redirectTo ="/"}) {

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if(!isAuthenticated){
       return <Navigate to={redirectTo}/>
    }

    return children ? children : <Outlet/>
}