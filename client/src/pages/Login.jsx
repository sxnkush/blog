import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; 
import { UserContext } from "../context/userContext";
import axios from 'axios'

const Login = () => {
  const [passVisible, setPassVisible] = useState(false);
  const [error, seterror] = useState('')
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {setcurrentUser}  = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();
    seterror(' ')
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      const user =await response.data;
      console.log(user)
      setcurrentUser(user)
      toast.success(`${user.name} loged in succefully`, {
        duration: 4000,
        position: 'top-center',
      
        // Styling
        style: {},
        className: '',
      
        // Custom Icon
        icon: '🔥',
      
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
      navigate("/")
    } catch (error) {
      seterror(error.response.data.message)
    }
  }
  const handleChange = (e) => {
    // Update form data dynamically
    setUserData((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
      };
    });
  };
  const makePassVisible = () => {
    setPassVisible(!passVisible);
  };
  return (
    <section className="container md:mx-auto py-16 md:px-24 h-[75vh] ">
      <div className="bg-white  py-7 rounded-xl backdrop-blur-xl bg-opacity-15 ">
        <h1 className="flex items-center justify-center mb-5 text-3xl font-semibold">
          Log In
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleLogin}>
          <input
            className="rounded-lg px-2 py-1 w-3/4 mx-auto "
            type="email"
            placeholder="Enter email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            className="rounded-lg px-2 py-1 w-3/4 mx-auto "
            type={passVisible ? "text":"password"}
            placeholder="Create Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="submit px-3 py-1 bg-slate-400 text-white hover:text-black hover:bg-green-400 
        rounded-md mx-auto w-1/6"
          >
            Log In
          </button>
          <small className="mx-auto">
            Don't  have an account{" "}
            <Link className="text-rose-700 font-semibold" to={"/register"}>
              Register
            </Link>
          </small>
          { error && <h3 className="mx-auto text-rose-950">{error}</h3>}
        </form>
      </div>
      <div
        className="absolute right-[70px] top-[268px] md:right-[265px] sm:right-[200px] cursor-pointer"
        onClick={makePassVisible}
      >
        {passVisible ? (
          <FaRegEye className="size-6" />
        ) : (
          <FaEyeSlash className="size-6" />
        )}
      </div>
    </section>
  );
};

export default Login;
