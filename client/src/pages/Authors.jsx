import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";




const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [error, seterror] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {id} = useParams()
  useEffect(() => {
  const getAuthors = async()=>{
    setIsLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/`)
      setAuthors(response?.data)
    } catch (error) {
      seterror(error.response.data.message)
    }
    setIsLoading(false)
  }
  getAuthors()
  }, [])
  if(isLoading){
    return <Spinner/>
  }

  return (
    <section className="Authors container mx-auto h-[80vh] ">
              <h1 className="lg:text-4xl md:text-2xl text-xl font-bold text-center m-10">Authors</h1>
      <div className="mx-auto md:mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {authors.map((p) => (
          <Link
            key={p._id}
            to={`/posts/users/${p._id}`}
            className="author-item flex flex-col bg-white  py-1 rounded-lg bg-opacity-25 items-center"
          >
            <div className="">
              <img className="rounded-full h-16 w-16 " src={`${import.meta.env.VITE_BASE_URL_ASSETS}/uploads/${p.avatar}`} alt={p.name} />
            </div>
            <h1 className="text-lg font-bold">{p.name}</h1>
            <p>{p.posts} posts</p>
          </Link>
        ))}
      </div>
      {error &&  <p className="flex items-center justify-center text-red-900 text-xl">{error}</p> }
    </section>
  );
};

export default Authors;
