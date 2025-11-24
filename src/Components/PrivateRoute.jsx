import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {authUser, loading} = useAuth();
    // console.log('user private:', user)

    if(loading) {
        return <p className='text-3xl text-red-300 text-center font-pacifico capitalize font-semibold'></p>
    }

    if(!authUser?.email) {
        return <Navigate to={'/login'} replace />
    }

    return children;
    
};

export default PrivateRoute;