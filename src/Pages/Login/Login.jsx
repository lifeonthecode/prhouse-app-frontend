import React, { useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axios';

const Login = () => {
    const { userLogin, setAuthUser } = useAuth();
    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const loginHandle = async () => {
        const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        const res = await userLogin(formData);

        if (res?.success) {
            toast.success(res?.message);
            const authRes = await axiosInstance.get('/auth/profile');
            setAuthUser(authRes?.data?.user || null);
            navigate('/');
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-dvh overflow-hidden relative">

            {/* Background Animation */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            />

            {/* LOGIN CARD */}
            <motion.div
                className="max-w-xl w-full shadow-lg bg-white/80 backdrop-blur-md rounded-xl p-8 z-10 flex flex-col gap-6 border"
                initial={{ scale: 0.8, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >

                {/* Animated Title */}
                <motion.h2
                    className="text-2xl text-black font-pacifico font-semibold text-center"
                    animate={{
                        y: [0, -3, 0],
                        color: ["#000", "#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#000"],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Sign In
                </motion.h2>

                {/* FORM */}
                <form className="flex flex-col gap-4">
                    <motion.input
                        type="email"
                        ref={emailRef}
                        placeholder="Email..."
                        className="w-full h-12 border rounded-lg pl-4 outline-none"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    />

                    <motion.input
                        type="password"
                        ref={passwordRef}
                        placeholder="Password..."
                        className="w-full h-12 border rounded-lg pl-4 outline-none"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Button */}
                    <motion.button
                        type="button"
                        onClick={loginHandle}
                        className="w-full bg-black text-white font-pacifico h-12 rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        Sign In
                    </motion.button>
                </form>

                {/* Bottom Text */}
                <p className="text-base text-black font-roboto flex gap-2 items-center justify-center">
                    Don't have an account?
                    <motion.span
                        whileHover={{ scale: 1.1, color: "#2563eb" }}
                        className="font-pacifico underline cursor-pointer"
                    >
                        <Link to="/register">Sign Up</Link>
                    </motion.span>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
