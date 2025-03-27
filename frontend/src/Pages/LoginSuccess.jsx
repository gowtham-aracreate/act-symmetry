import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSuccess.css";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard"); // Redirect to the dashboard after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="login-success-container">
      <div className="login-success-card">
        <h1 className="login-success-title">Login Successful!</h1>
        <p className="login-success-message">Welcome!</p>
      </div>
      
    </div>
  );
};

export default LoginSuccess;
