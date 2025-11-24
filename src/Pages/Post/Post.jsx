import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const Post = () => {
    const { search, setSearch } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axiosInstance.get(
                    `/post/get-only-posts?title=${search}`
                );
                setPosts(res?.data?.posts);
            } catch (error) {
                toast.warn(error.message);
                setPosts([]);
            }
        };
        fetchPosts();
    }, [search]);

    return (
        <div className="flex flex-col gap-8 h-dvh">

            {/* POSTS */}
            <div className="flex flex-col items-center gap-8 w-full px-4 pb-10">

                {posts?.map((item) => (
                    <div
                        key={item._id}
                        className="max-w-[470px] w-full bg-white rounded-xl hover:shadow-md transition-all duration-300 shadow-sm shadow-blue-500"
                    >

                        {/* PROFILE */}
                        <Link to={`/profile/${item?.user?._id}`}>
                            <div className="flex items-center gap-3 p-4 border-b-2 border-blue-500 rounded-sm transition-all duration-75 hover:bg-gray-200">
                                <img
                                    loading="lazy"
                                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow"
                                    src={item?.user?.profile?.url || "/avatar.jpg"}
                                    alt="Profile"
                                />
                                <h5 className="text-lg text-gray-900 font-semibold font-pacifico capitalize">
                                    {item?.user?.name}
                                </h5>
                            </div>
                        </Link>

                        {/* POST IMAGE */}
                        <div className="overflow-hidden rounded-lg mt-4">
                            <img
                                loading="lazy"
                                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500"
                                src={item?.post?.url}
                                alt={item?.title}
                            />
                        </div>

                        {/* POST CONTENT */}
                        <div className="flex flex-col gap-2 py-4 px-4">
                            <h4 className="text-lg text-gray-900 font-bold font-roboto capitalize">
                                {item?.title}
                            </h4>
                            <p className="text-base text-gray-700 font-normal font-roboto leading-relaxed">
                                {item?.description}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;
