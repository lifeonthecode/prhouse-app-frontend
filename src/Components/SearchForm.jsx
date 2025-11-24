import React, { useRef } from 'react';
import useAuth from './../hooks/useAuth';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const SearchForm = () => {
    const { setSearch } = useAuth();
    const searchRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchRef.current.value);
    };

    return (
        <div>
            <motion.div
                className='flex items-center justify-center gap-12 w-full border-b-2 border-blue-500 py-5 h-full bg-white shadow-md'
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <form
                    onSubmit={handleSearch}
                    className='max-w-[700px] w-full h-14 flex items-center gap-3 bg-gray-100 p-2 rounded-full shadow-inner hover:shadow-lg transition'
                >
                    <motion.input
                        ref={searchRef}
                        type="text"
                        placeholder='Search...'
                        className='flex-1 h-full outline-none pl-6 text-base text-gray-800 font-medium placeholder-gray-400 rounded-full'
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.button
                        type='submit'
                        className='px-6 h-full bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition cursor-pointer'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Search
                    </motion.button>
                </form>
                {/* ANIMATED LOGIN LINK */}
                <Link to={'/login'}>
                    <motion.span
                        className='text-2xl cursor-pointer text-black font-pacifico font-semibold capitalize'
                        animate={{
                            y: [0, -3, 0],             // floating
                            rotate: [0, 2, -2, 0],     // soft rotation
                            color: [
                                "#000",
                                "#2563eb",
                                "#16a34a",
                                "#f59e0b",
                                "#ef4444",
                                "#000"
                            ]
                        }}
                        transition={{
                            y: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            rotate: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            color: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "linear"
                            }
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        login
                    </motion.span>
                </Link>


            </motion.div>
        </div>
    );
};

export default SearchForm;
