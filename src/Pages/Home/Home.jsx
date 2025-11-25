import { Link } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axios";

const Home = ({ initialPosts }) => {
  const { search } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await axiosInstance.get(`/post/get-posts?title=${search}`);
        if (isMounted) {
          setPosts(res?.data?.posts || initialPosts);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
          setPosts([]);
          setLoading(false);
        }
        toast.warn(err.message);
      }
    };

    fetchPosts();
    return () => (isMounted = false);
  }, [search]);

  return (
    <div>
      {/* CONTENT WRAPPER */}
      <div className="flex flex-col items-center w-full pb-10">

        {/* LOADING SKELETON */}
        {loading && (
          <div className="w-full flex justify-center py-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="text-3xl text-red-300 font-pacifico"
            >
              Loading...
            </motion.p>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {!loading && error && (
          <p className="text-red-600 text-xl mt-10 font-semibold">
            Failed to load posts 😢
          </p>
        )}

        {/* POST LIST */}
        {!loading && !error && posts?.length === 0 && (
          <p className="text-gray-400 text-xl mt-10">No posts found</p>
        )}

        {!loading &&
          posts?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col max-w-[470px] w-full bg-white rounded-lg shadow-sm shadow-blue-500 mt-5"
            >
              {/* USER INFO */}
              <Link to={`/profile/${item?.user?._id}`}>
                <div className="flex items-center gap-3 p-5 border-b-2 border-blue-500 rounded-sm transition-all duration-75 hover:bg-gray-200">
                  <img
                    loading="lazy"
                    src={item?.user?.profile?.url || '/avatar.jpg'}
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
                {item?.category === "reel" ? (
                  <video
                    src={item?.post?.url}
                    controls
                    className="w-full h-full rounded-b-md"
                  ></video>
                ) : (
                  <motion.img
                    loading="lazy"
                    src={item?.post?.url}
                    alt={item?.title}
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="w-full h-full object-cover rounded-b-md"
                  />
                )}
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
    </div>
  );
};

export default Home;
