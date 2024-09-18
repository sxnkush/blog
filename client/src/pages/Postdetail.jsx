import React, { useState, useEffect } from "react";
import PostAuthor from "../Components/PostAuthor";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import Spinner from "../Components/Spinner";
import Delete from "./Delete";
const Postdetail = () => {
  const { id } = useParams(); // Get the post ID from the route
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, seterror] = useState('')

  const {currentUser} = useContext(UserContext)


  useEffect(() => {
    // Fetch post details from backend
    const fetchPost = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        seterror(error)
      }
      setIsLoading(false)
    };
    fetchPost();
  }, [id]);

  if(isLoading){
    return <Spinner/>
  }

  // Carousel settings for Slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <section className="postdetails container md:px-6 px-1 my-4">
      <div className="container p-4 px-4 rounded-md bg-white">
       { error && <p className="flex items-center justify-center font-semibold text-red-900">{error}</p>}
        <div className="flex justify-between items-center">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
           {currentUser?.id==post?.creator && <div className="flex md:gap-4 gap-1">
            <Link to={`/posts/${id}/edit`}>
              <button
                type="button"
                className="text-gray-900 bg-white bg-opacity-50 border border-gray-300 focus:outline-none hover:bg-yellow-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Edit
              </button>
            </Link>
              
                <Delete  postID={id}/>
              
          </div>}
        </div>

        <h1 className="text-2xl flex justify-center items-center font-semibold ">
          {post.title}
        </h1>

        {/* Slick Carousel for displaying multiple images */}
        <div className="my-4">
          <Slider {...settings}>
            {post.thumbnail.map((image, index) => (
              <div key={index}>
                <img
                  src={`${import.meta.env.VITE_BASE_URL_ASSETS}/uploads/${image}`}
                  className="w-full h-96 object-cover rounded-lg"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>

        <p className="font-medium" dangerouslySetInnerHTML={{__html:post.description}}></p>
      </div>
    </section>
  );
};

export default Postdetail;
