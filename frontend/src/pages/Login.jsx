import React, { useState } from "react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/User.context";
import { LoadingAnimation } from "../components/Loading";
import { PinData } from "../context/Pin.context";

const Login = () => {
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")

    const {loginUser,btnLoading} = UserData()
    const navigate = useNavigate();

    const {fetchPins} =PinData();

    const submitHandler =e =>{
        e.preventDefault();
        loginUser(email,password,navigate,fetchPins)
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img
            src="https://res.cloudinary.com/dp0qqumfh/image/upload/ShareNow_Logo-removebg-preview_ryoo5o.png"
            alt="pin-it-logo"
            className="h-12"
          />
        </div>
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Log in to see more{" "}
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email" value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300
                            rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300
                            rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={btnLoading}
            className=" w-full py-2 px-4 bg-red-600 hover:bg-red-700
             text-white font-semibold rounded-md shadow-sm focus:outline-none 
             focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {btnLoading?<LoadingAnimation/>:"Log in"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 to-gray-50">OR</span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            <span>
                Not On Pintrest yet?<Link to="/register"
                className="font-medium text-pintrest hover:underline"
                >Register</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
