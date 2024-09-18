import React, { useState } from "react";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";

const Userprofile = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatartIstouched, setAvatartIstouched] = useState(false);
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, seterror] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { name, avatar, email, bio } = response.data;
        setName(name);
        setAvatar(avatar);
        setBio(bio);
        setEmail(email);
      } catch (error) {
        seterror(error.response.data.message);
      }
    };
    fetchUser();
  }, []);

  const changeAvatar = async () => {
    setAvatartIstouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change-avatar`, // Correct URL without extra character
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response.data.avatar);
      toast.success(`Avatar changed`, {
        duration: 4000,
        position: 'top-center',
      
        // Styling
        style: {},
        className: '',
      
        // Custom Icon
        icon: '',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      seterror(error.response.data.message);
    }
  };

  const updateDetail = async (e) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,  // Adding email to match the backend logic
      currentPassword,
      newPassword,
      bio,
    };

    try {
    const response = await axios.patch(
      `http://localhost:5000/api/users/edit-user`,
      userData,
      { withCredentials: true, headers: { authorization: `Bearer ${token}` } }
    );
    if(response.status ==  200){
      // log user out
      navigate('/logout')
      
    }
    } catch (error) {
      seterror(error.response.data.message)
      console.log(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 bg-opacity-40 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-8 text-center">My Profile</h1>

      {error && (
        <p className="text-md font-semibold mb-8 text-red-900 text-center">
          {error}
        </p>
      )}

      <section className="userprofile container flex flex-col md:flex-row items-center md:gap-24 justify-center w-full mx-auto md:w-4/5 bg-white bg-opacity-25 rounded-xl p-4">
        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center mb-8 md:mb-0">
          <img
            className="rounded-full w-24 h-24 md:w-48 md:h-48 object-cover"
            src={`${import.meta.env.VITE_BASE_URL_ASSETS}/uploads/${avatar}`}
            alt="Avatar"
          />
          <p className="mt-2 text-lg font-semibold">{name}</p>
          <Link to={`/mypost/${id}`}>
            <button className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-800">
              My Posts
            </button>
          </Link>
        </div>

        {/* Edit Icon */}
        <form className="absolute top-[270px] left-[250px] lg:top-[480px] lg:left-[450px] bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition">
          <input
            className="hidden"
            type="file"
            name="avatar"
            id="avatar"
            accept="png, jpeg, jpg"
            onChange={(e) => setAvatar(e.target.files[0])}
          />

          <label
            htmlFor="avatar"
            className=""
            onClick={() => setAvatartIstouched(true)}
          >
            <FaRegEdit />
          </label>
        </form>
        {avatartIstouched && (
          <button
            onClick={changeAvatar}
            className=" absolute top-[270px] left-[220px] lg:top-[480px] lg:left-[450px] bg-white p-3 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            <FaCheck className="text-green-600 size-2 md:size-4" />
          </button>
        )}

        {/* Form Section */}
        <form
          className="flex flex-col w-full md:w-1/2 space-y-4"
          onSubmit={updateDetail}
        >
          <input
            className="rounded-lg p-3 w-full border border-gray-300 focus:ring-2 focus:ring-gray-400"
            type="text"
            placeholder="User name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-lg p-3 w-full border border-gray-300 focus:ring-2 focus:ring-gray-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="rounded-lg p-3 w-full border border-gray-300 focus:ring-2 focus:ring-gray-400"
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            className="rounded-lg p-3 w-full border border-gray-300 focus:ring-2 focus:ring-gray-400"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <textarea
            className="rounded-lg p-3 w-full h-24 border border-gray-300 focus:ring-2 focus:ring-gray-400"
            placeholder="Bio"
            value={bio}
            name="bio"
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-gray-600 text-white w-1/3 mx-auto hover:bg-gray-800"
          >
            Edit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Userprofile;
