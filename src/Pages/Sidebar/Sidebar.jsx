import React, { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { SiYoutubeshorts, SiReaddotcv } from "react-icons/si";
import { FiPlusSquare } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axios";

const navLinks = [
    {
        link: "home",
        icon: <TiHome size={"1.5rem"} />,
        to: "/",
    },
    {
        link: "reel",
        icon: <SiYoutubeshorts size={"1.5rem"} />,
        to: "/reel",
    },
    {
        link: "post",
        icon: <SiReaddotcv size={"1.5rem"} />,
        to: "/post",
    },
    {
        link: "create",
        icon: <FiPlusSquare size={"1.5rem"} />,
        to: "/create",
    },
];

const Sidebar = () => {
    const [user, setUser] = useState(null)
    // ===================== FETCH PROFILE =====================
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axiosInstance.get(`/auth/profile`)
                setUser(res?.data?.user);
            } catch (error) {
                toast.warning(error.message);
                setUser(null);
            }
        };
        fetchProfile();
    }, [id]);

    return (
        <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[260px] w-full h-screen border-r-2 border-blue-500 bg-white shadow-md px-6 py-10 fixed left-0 top-0 z-20"
        >
            <div className="flex flex-col gap-12">

                {/* LOGO */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pl-3"
                >
                    <Link to="/">
                        <motion.span
                            className="text-3xl font-pacifico font-semibold tracking-wide"
                            animate={{
                                rotate: [0, 3, -3, 0], // gentle rotation
                                color: ["#000000", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#000000"] // color cycle
                            }}
                            transition={{
                                rotate: {
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut"
                                },
                                color: {
                                    duration: 8,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "linear"
                                }
                            }}
                        >
                            PRHouse
                        </motion.span>
                    </Link>
                </motion.div>

                {/* NAV LINKS */}
                <motion.ul
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {navLinks.map((item, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ scale: 1.03, x: 5 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            className="rounded-lg"
                        >
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                                        ? "text-blue-600 font-bold bg-blue-100"
                                        : "text-gray-700 font-medium hover:bg-gray-100"
                                    }`
                                }
                            >
                                {item.icon} {item.link}
                            </NavLink>
                        </motion.li>
                    ))}
                </motion.ul>

                {/* PROFILE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-5 border-t-2 border-blue-500"
                >
                    <motion.div whileHover={{ scale: 1.03, x: 5 }}>
                        <Link
                            to={`/profile/${user?._id}`}
                            className="flex items-center gap-3 p-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-lg transition"
                        >
                            <img
                                className="w-8 h-8 rounded-full object-cover border"
                                src={user?.profile?.url || "/avatar.jpg"}
                                alt="profile"
                            />
                            Profile
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
