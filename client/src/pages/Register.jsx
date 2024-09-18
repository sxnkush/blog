import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios'



const Register = () => {
  const [passVisible, setPassVisible] = useState(false);
  const [confrmVisible, setConfrmVisible] = useState(false)
  const [error, seterror] = useState('')
  const [userData, setUserData] = useState({

    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate()

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
  const confrmVisiblebtn=()=>{
    setConfrmVisible(!confrmVisible)
  }
 const formhandler = async(e)=>{
  e.preventDefault();
  seterror('')
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData);
    console.log(response)
    const newUser = await response.data
    console.log(newUser)
    if(!newUser){
      seterror("can not register !")
    }
    if(!error){
      navigate("/login")
    }
    
  } catch (error) {
    seterror(error.response.data.message)
  }
 }

  return (
    <section className="container md:mx-auto py-16 md:px-24 h-[75vh] ">
      <div className="bg-white  py-7 rounded-xl backdrop-blur-xl bg-opacity-15 ">
        <h1 className="flex items-center justify-center mb-5 text-3xl font-semibold">
          Sign In
        </h1>
        <form className="flex flex-col gap-2" onSubmit={formhandler}>
          <input
            className="rounded-lg px-2 py-1 w-3/4 mx-auto "
            type="text"
            placeholder=" Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
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
          <input
            className="rounded-lg px-2 py-1 w-3/4 mx-auto "
            type={confrmVisible ? "text":"password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="submit md:px-3 px-1 py-1 bg-slate-400 text-white hover:text-black hover:bg-green-400 
        rounded-md mx-auto w-1/6"
          >
            Sign In
          </button>
          <small className="mx-auto">
            already have an account{" "}
            <Link className="text-rose-900 font-semibold" to={"/login"}>
              Log In
            </Link>
          </small>
        </form>
      {error &&  <p className="flex items-center justify-center text-red-600 font-semibold">{error}</p>}
      
      </div>
      <div>
        <ul className="text-gray-300">
          <h1 className="text-white">Note</h1>
          <li> ◉Please Enter a Valid email Address , a verication code will be sent to your respective gmail , first verify and then login</li>
          <li> ◉Also wait few seconds after registering you will be redirected t login</li>
        </ul>
      </div>
      <div
        className="absolute right-[70px] top-[310px] md:right-[265px] sm:right-[210px] cursor-pointer"
        onClick={makePassVisible}
      >
        {passVisible ? (
          <FaRegEye className="size-6" />
        ) : (
          <FaEyeSlash className="size-6" />
        )}
      </div>
      <div
        className="absolute right-[70px] top-[350px] md:right-[265px] sm:right-[210px] cursor-pointer"
        onClick={confrmVisiblebtn}
      >
        {confrmVisible ? (
          <FaRegEye className="size-6" />
        ) : (
          <FaEyeSlash className="size-6" />
        )}
      </div>
    </section>
  );
};

export default Register;
