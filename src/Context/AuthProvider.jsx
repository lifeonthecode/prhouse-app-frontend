import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import axiosInstance from '../api/axios';


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null); // user info
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axiosInstance.get('/auth/profile');
                setAuthUser(res?.data?.user || null);
                setLoading(false);

            } catch (error) {
                setAuthUser(null);
                setLoading(true);
            }
        };

        fetchUserProfile();
    }, []);


    // user login handle 
    const userLogin = async (data) => {
        const res = await axiosInstance.post('/auth/login', data);
        return res?.data;
    }


    // user register handle 
    const userRegister = async (data) => {
        const res = await axiosInstance.post('/auth/register', data);
        return res?.data;
    };


    // user profile image upload handle 
    const userProfileUpload = async (formData) => {
        const res = await axiosInstance.patch('/auth/profile-upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res?.data;
    }

    const useLogout = async () => {
        const res = await axiosInstance.post('/auth/logout');
        return res?.data;
    }

    // console.log('search: ', search)



    return (
        <AuthContext.Provider value={{authUser, loading, userLogin, userRegister, userProfileUpload, useLogout, search, setSearch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;