import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Register = () => {
    const { userRegister } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const data = {
            name,
            email,
            password,
        };
        if (res?.success) {
            toast.success(res?.message);
            navigate('/login');
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center w-full h-dvh bg-gradient-to-br from-gray-100 to-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="max-w-xl w-full bg-white shadow-xl p-8 rounded-2xl flex flex-col gap-6 border-2 border-blue-500"
                initial={{ scale: 0.8, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Title */}
                <motion.h2
                    className="text-2xl text-black font-pacifico font-semibold text-center"
                    animate={{
                        y: [0, -3, 0],
                        rotate: [0, 1.2, -1.2, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                    }}
                >
                    Sign Up
                </motion.h2>

                {/* Form */}
                <form className="flex flex-col gap-4" onSubmit={(e) => handleRegister(e)}>
                    <motion.input
                        type="text"
                        id='name'
                        placeholder="Name..."
                        className="w-full h-12 border border-gray-300 pl-4 rounded-md outline-none"
                        whileFocus={{ scale: 1.03, boxShadow: "0 0 8px rgba(0,0,0,0.2)" }}
                        transition={{ duration: 0.3 }}
                    />

                    <motion.input
                        type="email"
                        id='email'
                        placeholder="Email..."
                        className="w-full h-12 border border-gray-300 pl-4 rounded-md outline-none"
                        whileFocus={{ scale: 1.03, boxShadow: "0 0 8px rgba(0,0,0,0.2)" }}
                        transition={{ duration: 0.3 }}
                    />

                    <motion.input
                        type="password"
                        id='password'
                        placeholder="Password..."
                        className="w-full h-12 border border-gray-300 pl-4 rounded-md outline-none"
                        whileFocus={{ scale: 1.03, boxShadow: "0 0 8px rgba(0,0,0,0.2)" }}
                        transition={{ duration: 0.3 }}
                    />

                    <motion.button
                        type="submit"
                        className="w-full h-12 bg-black text-white rounded-md font-pacifico text-lg cursor-pointer"
                        whileHover={{ scale: 1.05, backgroundColor: "#222" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        Sign Up
                    </motion.button>
                </form>

                {/* Bottom Text */}
                <p className="text-base text-black flex gap-2 items-center justify-center">
                    Already have an account?
                    <motion.span whileHover={{ scale: 1.1 }}>
                        <Link
                            className="text-lg text-blue-600 font-pacifico underline cursor-pointer"
                            to="/login"
                        >
                            Sign In
                        </Link>
                    </motion.span>
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Register;
