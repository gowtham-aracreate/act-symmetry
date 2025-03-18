import React, { useState } from 'react';
import Label from '../Components/Label';
import Button from '../Components/Button';
import axios from 'axios';
import "./Login.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/forgot-password", { email });
      alert("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/verify-otp", { email, otp });
      alert("OTP verified! Enter new password.");
      setStep(3);
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/reset-password", { email, otp, newPassword });
      alert("Password reset successful! Please log in.");
      if (res.data.redirectUrl) {
        window.location.href = res.data.redirectUrl;
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error resetting password");
    }
  };
  return (
    <div className="@container w-154">
      <div className="mt-[195px] mr-[132px] ml-[130px]">
        <form>
          <div className='mb-4'>
            <h2 className="font-bold text-2xl mb-4 text-center">Forget your Password?</h2>
            <p className="text-gray-600 w-[386px]">Enter your email below to receive your password reset instructions</p>
            <p className="text-gray-600 mb-14 "></p>
            <Label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2' text="Email" />
            <h2>Email</h2>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your Email"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
          </div>
          {step === 1 && (
            <div className='flex items-center justify-center'>
              <button id="button" type="submit" className="mt-[100px]" onClick={sendOtp}>Send OTP</button>
            </div>
          )}
          {step === 2 && (
            <div className='flex flex-col '>
              <input className='shadow appearance-none rounded mt-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100' type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <div className='flex items-center justify-center'>
                <button id="button" type="submit" className="mt-[60px]" onClick={verifyOtp}>Verify OTP</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className='flex flex-col gap-4'>
              <h2></h2>
              <input className='shadow appearance-none rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100' type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <div className='flex items-center justify-center'>
                <button id="button" type="submit" className="mt-[60px]" onClick={resetPassword}>Reset Password</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default ForgetPassword;