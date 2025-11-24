import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axiosInstance from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const Reel = () => {
    const { search } = useAuth();
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReels = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get(`/post/get-reels?title=${search}`);
                setReels(res?.data?.reels || []);
            } catch (error) {
                toast.warn(error.message);
                setReels([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReels();
    }, [search]);

    return (
        <div className="flex flex-col gap-8 h-dvh">
            {/* CONTENT */}
            <div className="flex flex-col items-center gap-6 w-full pb-10">
                {/* LOADING SKELETON */}
                {loading && (
                    <div className="w-full max-w-[470px] animate-pulse p-4 bg-gray-200 rounded-2xl h-[500px]" />
                )}

                {!loading && reels.length === 0 && (
                    <p className="text-lg text-gray-500 font-medium">No reels found!</p>
                )}

                {!loading && <div>
                    {

                        reels?.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex flex-col justify-between max-w-[470px] w-full bg-white rounded-lg shadow-sm shadow-blue-500 mt-5"
                            >
                                {/* USER INFO */}
                                <Link to={`/profile/${item?.user?._id}`}>
                                    <div className="flex items-center gap-3 p-5 border-b-2 border-blue-500 rounded-sm transition-all duration-75 hover:bg-gray-200">
                                        <img
                                            loading="lazy"
                                            src={item?.user?.profile?.url}
                                            alt={item?.user?.name}
                                            className="w-10 h-10 rounded-full border-2 border-green-500 object-cover"
                                        />
                                        <h5 className="text-lg font-pacifico font-semibold capitalize text-black">
                                            {item?.user?.name}
                                        </h5>
                                    </div>
                                </Link>

                                {/* MEDIA */}
                                <div className="w-full h-[450px]">
                                    <video
                                        src={item?.post?.url}
                                        controls
                                        className="w-full h-full rounded-b-md"
                                    ></video>
                                </div>

                                {/* TEXT SECTION */}
                                <div className="flex flex-col gap-2 py-5 px-4">
                                    <h4 className="text-lg font-roboto font-medium capitalize text-black">
                                        {item?.title}
                                    </h4>
                                    <p className="text-base text-gray-700 font-roboto font-normal">
                                        {item?.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                </div>
                }
            </div>
        </div>
    );
};

export default Reel;
