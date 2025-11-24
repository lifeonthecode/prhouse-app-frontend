import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axios";
import { motion } from "framer-motion";

const Create = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
    });

    const [uploadFile, setUploadFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle Input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // File Handler
    const handleFile = (file) => {
        if (!file) return;

        if (file.size > 50 * 1024 * 1024) {
            toast.error("File size too large! Max 50MB allowed.");
            return;
        }

        const type = file.type.startsWith("video") ? "video" : "image";

        setPreview({
            url: URL.createObjectURL(file),
            type,
        });

        setUploadFile(file);
        setForm({ ...form, category: type === "video" ? "reel" : "post" });
    };

    // Create Post
    const handleCreatePost = async () => {
        if (!form.title || !form.description || !uploadFile) {
            toast.warn("Please fill all fields & upload a file!");
            return window.scrollTo(0, 0);
        }

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("file", uploadFile);

        setLoading(true);

        try {
            const res = await axiosInstance.post("/post/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res?.data?.success) {
                toast.success(res?.data?.message);

                setForm({ title: "", description: "", category: "" });
                setUploadFile(null);
                setPreview(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex w-full h-dvh items-center justify-center"
        >
            <div className="max-w-xl w-full mx-auto bg-white shadow-lg rounded-2xl p-6 border-2 border-blue-500">

                <h2 className="text-xl text-center mb-5 text-blue-500 font-pacifico font-semibold">
                    Upload New Post
                </h2>

                {/* TITLE */}
                <label className="text-sm font-medium text-black">Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-blue-500 mt-1 mb-3 bg-transparent focus:border-black outline-none"
                    placeholder="Enter post title..."
                />

                {/* DESCRIPTION */}
                <label className="text-sm font-medium text-black">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border border-blue-500 mt-1 mb-3 bg-transparent resize-none focus:border-black outline-none"
                    rows={3}
                    placeholder="Enter post description..."
                ></textarea>

                {/* FILE UPLOAD */}
                <label className="text-sm font-medium text-black">Image / Video</label>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="border-2 border-dashed border-blue-500 rounded-lg p-5 mb-5 text-center cursor-pointer"
                >
                    <p className="text-sm text-gray-500 mb-2">Click to upload</p>

                    <input
                        type="file"
                        accept="image/*,video/*"
                        className="w-full text-sm cursor-pointer"
                        onChange={(e) => handleFile(e.target.files[0])}
                    />
                </motion.div>

                {/* PREVIEW */}
                {preview && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-3"
                    >
                        <label className="text-sm font-medium text-black">
                            Preview
                        </label>

                        <div className="relative w-full h-40 mt-1 rounded-lg overflow-hidden border">
                            {preview.type === "image" ? (
                                <img
                                    src={preview.url}
                                    alt="preview"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                    src={preview.url}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            )}

                            <button
                                className="absolute top-1 right-1 bg-blue-500 cursor-pointer text-white px-2 py-1 text-xs rounded"
                                onClick={() => {
                                    setPreview(null);
                                    setUploadFile(null);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* SUBMIT BUTTON */}
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreatePost}
                    disabled={loading}
                    className={`text-sm text-white p-3 font-semibold w-full mt-4 rounded-md cursor-pointer transition hover:bg-gray-900 ${loading ? 'bg-blue-500' : 'bg-black' }`}
                >
                    {loading ? "Uploading..." : "Upload Post"}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Create;
