import React, { useEffect, useState } from "react";
import { IoMdGrid } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router";
import axiosInstance from "../../api/axios";

const Profile = () => {
    const { userProfileUpload, useLogout, authUser, setAuthUser } = useAuth();

    const [previewProfile, setPreviewProfile] = useState(null);
    const [activeTab, setActiveTab] = useState("posts");
    const [profileImage, setProfileImage] = useState(null);
    const [bio, setBio] = useState("");
    const [editingBio, setEditingBio] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(false);

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    // ===================== FETCH PROFILE =====================
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const userRes = await axiosInstance.get(`/auth/profile/${id}`);
                setUser(userRes?.data?.user);
                const postRes = await axiosInstance.get(`/post/get-user-posts/${id}`);
                setPosts(postRes?.data?.posts);

            } catch (error) {
                toast.success(error?.response?.data?.message);
                setPosts([]);
            }
            setLoading(false);
        };
        fetchProfile();
    }, [id]);

    // ===================== PROFILE IMAGE HANDLER =====================
    const handleFile = (file) => {
        if (!file) return;
        if (file.size > 3 * 1024 * 1024)
            return toast.warn("Image size too large! Max 3MB.");

        setPreviewProfile(URL.createObjectURL(file));
        setProfileImage(file);
    };

    // ===================== UPLOAD PROFILE =====================
    const handleProfileUpload = async () => {
        if (!profileImage && !bio) return toast.warn("Nothing to update!");

        const formData = new FormData();
        if (profileImage) formData.append("profile", profileImage);
        if (bio) formData.append("bio", bio);

        const res = await userProfileUpload(formData);

        if (res?.success) {
            toast.success(res?.message);
            setEditingBio(false);
            setProfileImage(null);
            setPreviewProfile(null);

            // Refresh Profile Data
            const userRes = await axiosInstance.get(`/auth/profile/${id}`);
            setUser(userRes?.data?.user);
            const authRes = await axiosInstance.get('/auth/profile');
            setAuthUser(authRes?.data?.user || null);
        }
    };

    // ===================== LOGOUT =====================
    const handleLogout = async () => {
        try {

            const res = await useLogout();
            if (res?.success) {
                toast.success(res?.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    };

    // ===================== SWITCH TAB =====================
    const switchTab = async (type) => {
        setActiveTab(type);
        setLoadingPosts(true);

        try {
            const url =
                type === "posts"
                    ? `/post/get-user-posts/${id}`
                    : `/post/get-user-reels/${id}`;

            const res = await axiosInstance.get(url);
            setPosts(res.data[type === "posts" ? "posts" : "reels"]);
        } catch (err) {
            toast.warning(err?.response?.data?.message);
        }

        setLoadingPosts(false);
    };

    // ===================== DELETE =====================
    const handleDelete = async (deleteId, category) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            const res = await axiosInstance.delete(
                `/post/delete-user-single-post/${deleteId}`
            );

            if (res?.data?.success) {
                toast.success("Deleted successfully!");
                switchTab(category === "post" ? "posts" : "reels");
            }
        } catch (error) {
            toast.warn(error?.response?.data?.message);
        }
    };

    // ===================== LOADING STATE =====================
    if (loading)
        return (
            <div className="text-center text-3xl font-semibold py-40 animate-pulse text-red-500">
                Loading profile...
            </div>
        );

    return (
        <div className="flex items-center justify-center py-10">
            <div className="max-w-[950px] w-full px-4">

                {/* ===================== PROFILE SECTION ===================== */}
                <div className="flex items-start gap-10 pb-12 flex-wrap bg-white shadow-lg rounded-xl p-6 border-2 border-blue-500">

                    {/* Profile Image */}
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-40 h-40 relative group">
                            {
                                previewProfile ? (
                                    <img
                                        className="w-full h-full rounded-full border-4 border-blue-500 shadow object-cover transition-all duration-300 group-hover:scale-105"
                                        src={previewProfile}
                                        alt="profile"
                                        loading="lazy"
                                    />

                                ) : (
                                    <img
                                        className="w-full h-full rounded-full border-4 border-blue-500 shadow object-cover transition-all duration-300 group-hover:scale-105"
                                        src={user?.profile?.url || "/avatar.jpg"}
                                        alt="profile"
                                        loading="lazy"
                                    />

                                )
                            }


                            {authUser?._id === id && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => handleFile(e.target.files[0])}
                                />
                            )}
                        </div>

                        {authUser?._id === id && (
                            <button
                                onClick={handleProfileUpload}
                                className="text-sm px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow cursor-pointer"
                            >
                                Save Changes
                            </button>
                        )}
                    </div>

                    {/* ===================== Profile Info ===================== */}
                    <div className="flex-1">
                        <h4 className="text-3xl font-semibold text-gray-900">
                            {user?.name}
                        </h4>

                        {
                            !editingBio ? (
                                <p
                                    className="text-gray-600 mt-3 cursor-pointer hover:text-gray-900"
                                    onClick={() => authUser?._id === id && setEditingBio(true)}
                                >
                                    {user?.profile?.bio ?
                                        <span>{user?.profile?.bio}</span> :
                                        <span>{(authUser?._id === id && "Click to write your bio")}</span>}
                                </p>
                            ) : (
                                <textarea
                                    className="border p-3 rounded-md w-full mt-3"
                                    placeholder="Write your bio..."
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            )
                        }

                        {authUser?._id === id && (
                            <button
                                onClick={handleLogout}
                                className="text-sm px-5 py-2 bg-red-500 text-white rounded-md mt-4 hover:bg-red-600 transition cursor-pointer"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>

                {/* ===================== TAB BUTTONS ===================== */}
                <div className="flex items-center justify-center gap-12 border-b-2 border-blue-500 pb-4 mt-10">
                    <button
                        onClick={() => switchTab("posts")}
                        className={`flex items-center gap-2 text-lg font-semibold transition cursor-pointer 
                        ${activeTab === "posts" ? "text-blue-600 border-b-2 border-blue-600 pb-2" : "text-gray-600"}`}
                    >
                        <IoMdGrid size={22} /> Posts
                    </button>

                    <button
                        onClick={() => switchTab("reels")}
                        className={`flex items-center gap-2 text-lg font-semibold transition cursor-pointer 
                        ${activeTab === "reels" ? "text-blue-600 border-b-2 border-blue-600 pb-2" : "text-gray-600"}`}
                    >
                        <SiYoutubeshorts size={22} /> Reels
                    </button>
                </div>

                {/* ===================== POSTS GRID ===================== */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                    {loadingPosts ? (
                        <p className="text-center col-span-3 text-3xl text-red-500 animate-pulse">
                            Loading...
                        </p>
                    ) : posts?.length < 1 ? (
                        <p className="text-center col-span-3 text-lg text-gray-500">
                            No content found!
                        </p>
                    ) : (
                        posts.map((item) => (
                            <div
                                key={item._id}
                                className="shadow-md rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition"
                            >
                                {item.category === "reel" ? (
                                    <video
                                        loading="lazy"
                                        className="w-full h-[300px] object-cover"
                                        src={item.post.url}
                                        controls
                                    ></video>
                                ) : (
                                    <img
                                        loading="lazy"
                                        className="w-full h-[300px] object-cover"
                                        src={item.post.url}
                                        alt={item.title}
                                    />
                                )}

                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-gray-900">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {item.description}
                                    </p>

                                    {authUser?._id === id && (
                                        <button
                                            onClick={() => handleDelete(item._id, item.category)}
                                            className="px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded-md text-white cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
