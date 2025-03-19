import React, { useState } from 'react'
import axios from 'axios' 
import Label from '../Components/Label'
import Button from '../Components/Button'
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]$/;

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPass(password);

    if (!passwordRegex.test(password)) {
      setError("Password must contain 1 uppercase, 1 lowercase, 1 digit and 1 special character.");
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(pass)) {
      setError("Password must contain 1 uppercase, 1 lowercase, 1 digit and 1 special character.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/create', {
        name,
        email,
        password: pass,
      });
      console.log(response);
      setName('');
      setEmail('');
      setPass('');
      alert("Register successful!");
      navigate('/');
    } catch (error) {
      console.error('Error creating user', error);
      alert("Register failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-bold text-2xl mb-4 text-center">Register</h1>
        <p className="text-gray-600 mb-6 text-center">Please provide user credentials to register</p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label htmlFor="name" text="Name" className="block text-gray-700 text-sm font-bold mb-2" />
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
              <Label htmlFor="email" text="Email" className="block text-gray-700 text-sm font-bold mb-2" />
              <input
                type="email"
                id="email"
                placeholder="Please enter your Email"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col relative">
              <Label htmlFor="password" text="Password" className="block text-gray-700 text-sm font-bold mb-2" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Please enter your Password"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                value={pass}
                onChange={handlePasswordChange}
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="pt-4">
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