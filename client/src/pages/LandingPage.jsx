import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  // Scroll hooks for scroll-based animations
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  if (inView) {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    });
  }

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  

  return (
    <div className="bg-gray-700  text-white">
      {/* Main Landing Page Section */}
      <div className=" h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.pixabay.com/photo/2020/04/03/06/35/work-4997565_1280.png" // Ensure your image path is correct
            alt="Background"
            className="object-cover w-full h-full opacity-80"
          />
        </div>

        {/* Hero Section with Motion Effects */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-yellow-400">
              Welcome to <span className="text-blue-700">Appify</span> 
            </h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-xl md:text-2xl mb-10"
            >
              Discover, read, and share engaging blogs with ease. Join our
              community today!
            </motion.p>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col md:flex-row gap-4"
            >
              <Link to="/login">
                <button className="bg-yellow-500 text-gray-100 hover:text-yellow-400 hover:bg-white px-6 py-3 rounded-lg  transition duration-300">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-500 transition duration-300">
                  Sign Up
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* About the App Section */}
      <section className="bg-gray-900 text-white py-16 px-4 md:px-8 lg:px-16">
        <div
          ref={ref}
          className="container mx-auto flex flex-col md:flex-row items-center justify-between"
        >
          {/* Text Section with Scroll Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-center md:text-left">
              About Appify
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-center md:text-left">
            Appify is your go-to platform for discovering and sharing
              insightful blogs. Whether you're a writer looking to showcase your
              work or a reader in search of thought-provoking content,
              BlogSphere provides a seamless experience.
            </p>
          </motion.div>

          {/* Video Section with Scroll-Based Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            className="w-full max-w-lg md:w-1/2"
          >
            <video
              className="w-full rounded-lg shadow-lg"
              src="/img/title-vdeo.mp4" // Replace with your video path
              alt="About BlogSphere Video"
              autoPlay
              loop
              muted
              playsInline // Ensures autoplay works on mobile devices
            ></video>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
