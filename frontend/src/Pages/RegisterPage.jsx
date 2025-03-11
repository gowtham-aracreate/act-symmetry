import React, { useState } from 'react'
import axios from 'axios' 
import Label from '../Components/Label'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'

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
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(pass)) {
      setError("Password must contain 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be exactly 8 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", { name, email, pass });

      console.log(response.data);  // Debugging: Check response from backend

      alert("Register successful!");
      navigate("/"); // Redirect after login

    } catch (error) {
      console.error("Error registering:", error);
      alert("Register failed. Please check your credentials.");
    }
  }
  
  return (
    <div>
      <div className="@container w-150 ">
        <div className="bg-white mt-[195px] mr-[132px] ml-[130px] ">
          <h1 className="font-bold text-2xl mb-4 text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col'>
                <Label htmlFor="name" text="Name" className="block text-gray-700 text-sm font-bold mb-2" />
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Please enter your Name" 
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" 
                />
              </div>
              <div className='flex flex-col'>
                <Label 
                  htmlFor="email" 
                  text="Email"
                  className="block text-gray-700 text-sm font-bold mb-2" 
                />
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Please enter your Email" 
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" 
                />
              </div>
              <div className='flex flex-col'>
                <Label htmlFor="password" text="Password" className="block text-gray-700 text-sm font-bold mb-2" />
                <input 
                  name="pass"
                  type={showPassword ? "text" : "password"}
                  id="pass"
                  placeholder="Please enter your password"
                  value={pass}
                  onChange={handlePasswordChange}
                  onBlur={() => setIsTouched(true)}
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" 
                />
                <input 
                  type="checkbox" 
                  checked={showPassword} 
                  onChange={() => setShowPassword(!showPassword)} 
                /> Show Password
                <p className="text-gray-700 text-sm mt-1">{pass}</p>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <div className='pt-4 ml-6'>
                <Button  id="button" type="submit">Register</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
