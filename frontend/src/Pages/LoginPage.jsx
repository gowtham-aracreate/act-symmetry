import React, { useState } from 'react'
import axios from 'axios'  // Import Axios
import Label from '../Components/Label'
import Button from '../Components/Button'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from "react-router-dom";

import './login.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/post", { email, pass });

      console.log(response.data);  // Debugging: Check response from backend

      alert("Login successful!");
      navigate("/dashboard"); // Redirect after login

    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="@container w-150">
      <div className="bg-white mt-[195px] mr-[132px] ml-[130px]">
        <h1 className="font-bold text-2xl mb-4 text-center">Welcome back</h1>
        <p className="text-gray-600 mb-6 text-center">Please provide user credentials to login</p>

        {/* Form Start */}
        <form onSubmit={handleSubmit}>

          {/* Email Input */}
          <div className="mb-4">
            <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" text="Email" />
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Please enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Capture input change
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2" text="Password" />
            <div className="relative">
              <input
                name="pass"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Please enter your password"
                value={pass}
                onChange={(e) => setPass(e.target.value)} // Capture input change
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              />
              <Button
                id="eye-btn"
                type="button"
                className="absolute right-0 pr-3 pt-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-between mb-6 ml-50">
            <a href="#" onClick={() => navigate("/forget-password")} className="inline-block align-baseline font-bold text-sm text-black-500 hover:text-black-800">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="flex items-center justify-center ml-7">
            Log In
          </Button>

        </form>
        {/* Form End */}

        {/* Register Link */}
        <div className="flex items-center pt-4 justify-center">
          <p>Don't have an account? </p>
          <a href="#" onClick={() => navigate("/register")} className="inline-block align-baseline font-bold text-sm text-black-500 hover:text-black-800">
            Register
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;
