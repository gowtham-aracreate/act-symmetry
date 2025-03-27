import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Label from "../Components/Label";
import Button from "../Components/Button";
import admin_logo from "../assets/images/admin_logo.png";
import { Eye, EyeOff } from "lucide-react";
import "./login.css";
import LoginSuccess from "./LoginSuccess";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); // Track login success
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleUser = async (e) => {
    e.preventDefault();
    const UserDetail = {
      email,
      password,
    };
    try {
      const res = await axios.post("http://localhost:4000/login", UserDetail);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email); // Store email for logging actions
      await axios.post("http://localhost:4000/log-action", { email, action: "Login" }); // Log login action
      setIsLoginSuccess(true); // Show the success screen
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  if (isLoginSuccess) {
    return <LoginSuccess />; // Render the success screen
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src={admin_logo} alt="Admin Logo" className="h-16 w-18" />
        </div>
        <h1 className="font-bold text-2xl mb-4 text-center">Welcome back</h1>
        <p className="text-gray-600 mb-6 text-center">Please provide user credentials to login</p>

        <form onSubmit={handleUser}>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2" text="Email" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              placeholder="Please enter your Email"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2" text="Password" />
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Please enter your password"
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

          <div className="flex items-center justify-between mb-6 ml-60">
            <a
              href="#"
              onClick={() => navigate("/forget-password")}
              className="inline-block align-baseline font-bold text-sm text-black-500 hover:text-black-800"
            >
              Forgot Password?
            </a>
          </div>

          <Button id="button" type="submit" className="flex items-center justify-center ml-14">
            Log In
          </Button>
        </form>
        <div className="flex items-center pt-4 justify-center">
          <p>Don't have an account? </p>
          <a
            href="#"
            onClick={() => navigate("/register")}
            className="inline-block align-baseline font-bold text-sm text-black-500 hover:text-black-800"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;