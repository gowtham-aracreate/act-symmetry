import React from 'react'
import Label from '../Components/Label'
import Button from '../Components/Button'
import "./Login.css"

const ForgetPassword = () => {
  return (
    <>
      <div className="@container w-154">
        <div className="mt-[195px] mr-[132px] ml-[130px]">
          
          <form action="" className="">
            <div className='mb-4 '>
              <h2 className="font-bold text-2xl mb-4 text-center">Forget your Password?</h2>
              <p className="text-gray-600 w-[386px]">Enter your email below to receive your password </p>
              <p className="text-gray-600 mb-16 text-center">reset instructions</p>
              <Label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2' text="Email" />
              <input 
                type="email" 
                id="email" 
                placeholder="Please enter your Email" 
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
              />
            </div>
            <div className='flex items-center justify-center'>
              <Button id="button" type="submit" className="mt-[100px]">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword