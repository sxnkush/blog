import React from 'react'
import PostAuthor from './PostAuthor';
import { Link } from 'react-router-dom';

const Postitem = ({id,postID,thumbnail,title,author,description,category,authorID,createdAt}) => {
  const shortdesc = description.length > 150 ? description.substr(0,145)+'...' : description;
  const shorttitle = title.length > 30 ? title.substr(0,50)+'...':title
  return (
    <section className="postitem h-[450px] p-3 bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 duration-300">
      {/* Container with fixed aspect ratio for consistent display */}
      <div className='relative w-full h-[250px] overflow-hidden rounded-md'>
        {/* Use max-h-full and max-w-full to ensure image fits without distortion */}
        <img
          className='w-full h-full object-cover rounded-md'
          src={`${import.meta.env.VITE_BASE_URL_ASSETS}/uploads/${thumbnail[0]}`}
          alt=""
        />
      </div>

      <Link className="font-semibold py-2" to={`/post/${postID}`}>
        <h1>{shorttitle}</h1>
      </Link>
      
      <p dangerouslySetInnerHTML={{ __html: shortdesc }}></p>
      
      <div className='author flex justify-between items-center py-2'>
        <PostAuthor authorID={authorID} createdAt={createdAt} />
        <Link
          className="rounded-xl px-2 py-1 hover:text-slate-300 hover:bg-gray-900 bg-slate-300"
          to={`/posts/category/${category}`}
        >
          <p>{category}</p>
        </Link>
      </div>
    </section>
  )
}

export default Postitem
