import React, { useState } from 'react';
import axios from 'axios';
import Label from '../Components/Label';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8}$/;

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPass(password);

    if (!passwordRegex.test(password)) {
      setError("Password must contain 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be exactly 8 characters long.");
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(pass)) {
      setError("Password must contain 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be exactly 8 characters long.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/create', UserDetails);
      console.log(response);
      setName('');
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.error("Error registering:", error);
      alert("Register failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-bold text-2xl mb-4 text-center">Register</h1>
        <p className="text-gray-600 mb-6 text-center">Please provide user credentials to register</p>

        <form onSubmit={handleUser}>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col">
              <Label htmlFor="name" text="Name" className="block text-gray-700 text-sm font-bold mb-2" /><p>Name</p>
              <input
                type="text"
                id="name"
                placeholder="Please enter your Name"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="email" text="Email" className="block text-gray-700 text-sm font-bold mb-2" /><p>Email</p>
              <input
                type="email"
                id="email"
                placeholder="Please enter your Email"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="password" text="Password" className="block text-gray-700 text-sm font-bold mb-2" /><p>Password</p>
              <input
                type="text"
                id="password"
                placeholder="Please enter your Password"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-4 ml-14 ">
              <Button id="button" type="submit">
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;