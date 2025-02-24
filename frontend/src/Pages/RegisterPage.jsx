import React from 'react'
import Label from '../Components/Label'
import Button from '../Components/Button'

const RegisterPage = () => {
    return (
        <div>
            <div className="@container w-150 ">
                <div className="bg-white mt-[195px] mr-[132px] ml-[130px] ">
                    <h1 className="font-bold text-2xl mb-4 text-center">Register</h1>
                    <div className='flex flex-col gap-4 '>
                        <div className='flex flex-col'>
                            <Label htmlFor="name" text="Name" className="block text-gray-700 text-sm font-bold mb-2" />Name
                            <input type="text" id="name" placeholder="Please enter your Name" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
                        </div>
                        <div className='flex flex-col'>
                            <Label htmlFor="email" text="Email" className="block text-gray-700 text-sm font-bold mb-2" />Email
                            <input type="email" id="email" placeholder="Please enter your Email" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" />
                        </div >
                        <div className='flex flex-col'> <Label htmlFor="password" text="Password" className="block text-gray-700 text-sm font-bold mb-2" />Password
                            <input type="password" id="password" placeholder="Please enter your Password" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100" /></div>
                        {/* <div className='flex flex-col'>
            <Label htmlFor="confirmPassword" text="Confirm Password" className="block text-gray-700 text-sm font-bold mb-2"/>Confirm Password
            <input type="password" id="confirmPassword" placeholder="Please re-enter your Password" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"/>
            </div> */}
                        <div className='pt-4 ml-6'>
                            <Button id="button" type="submit" >Register</Button>
                        </div>
                    </div>
                </div></div>
        </div>
    )
}

export default RegisterPage
