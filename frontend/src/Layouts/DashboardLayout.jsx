import React from 'react'
import vector from '../assets/images/vector.png'
import profile from '../assets/images/profile.png'
import device_man from '../assets/images/device_man.png'
import reports from '../assets/images/reports.png'
import set_user from '../assets/images/set_user.png'
import logout from '../assets/images/logout.png'
import admin_logo from '../assets/images/admin_logo.png'
import notification_head from '../assets/images/notification_head.png'
import profile_head from '../assets/images/profile_head.png'
import {useNavigate} from "react-router-dom";
// import DashboardCard from '../Components/DashboardCard'

const DashboardLayout = ({children}) => {
     const navigate = useNavigate();
  return (
    <div className='md:h-screen  bg-[#272C48] relative flex flex-row z-50'>
        <header className='h-[60px] w-full fixed top-0 left-0 bg-[#FFFFFF]'>
             <img className='w-[120px] h-[60px] ml-[25px]' src={admin_logo} alt="" />
             <div className='flex absolute bottom-5 right-10 gap-8'>
               <img className='w-[25px] h-[25px]' src={notification_head} alt="" />
               <img className='w-[25px] h-[25px]' src={profile_head} alt="" />
             </div>

        </header>

        <div className="w-[296px]  bg-[#272C48] flex flex-col gap-4 h-screen py-[80px] pl-[10px]">
             <div className="flex  hover:bg-[#2899CB] w-[220px] h-[44px] rounded-r-3xl items-center ">
                <img className="relative w-[18.666667938232422px] h-[18.666667938232422px] ml-[19px]" src={vector} alt="Vector" />
                <h1 className="ml-[10px] font-normal text-base text-white" onClick={()=>{navigate('/dashboard')}}>Dashboard</h1>
            </div>
            <div onClick={() => navigate("/profile")} className="flex bg-[#272C48] hover:bg-[#2899CB] w-[220px] h-[44px] rounded-r-3xl items-center">
                <img className="relative w-[18.666667938232422px] h-[18.666667938232422px] ml-[19px]" src={profile} alt="Profile" />
                <h1 className="ml-[10px] font-normal text-base text-white " onClick={()=>{navigate('/profile')}}>Profile</h1>
            </div>
            <div onClick={()=> navigate('/device-management')} className="flex bg-[#272C48] hover:bg-[#2899CB] w-[220px] h-[44px] rounded-r-3xl items-center">
                 <img className="relative w-[18.666667938232422px] h-[18.666667938232422px] ml-[19px]" src={device_man} alt="Device Management" />
                 <h1 className="ml-[10px] font-normal text-base text-white">Device Management</h1>
            </div>
            <div className="flex bg-[#272C48] hover:bg-[#2899CB] w-[220px] h-[44px] rounded-r-3xl items-center">
                 <img className="relative w-[18.666667938232422px] h-[18.666667938232422px] ml-[19px]" src={reports} alt="Reports" />
                 <h1 className="ml-[10px] font-normal text-base text-white">Reports</h1>
            </div>
            <div className="flex bg-[#272C48] hover:bg-[#2899CB] w-[220px] h-[44px] rounded-r-3xl items-center">
                 <img className="relative w-[18.666667938232422px] h-[18.666667938232422px] ml-[19px]" src={set_user} alt="VSet User Limits" />
            <     h1 className="ml-[10px] font-normal text-base text-white">Set User Limits</h1>
            </div>
            <div className="flex w-[170px] absolute ml-[19px] bottom-2 justify-start">
                 <img className="relative w-[18px] h-[18px] ml-[19px]" src={logout} alt="Logout" />
                 <h1 onClick={()=>navigate('/')} className="ml-[10px] font-normal text-base text-white cursor-pointer">LOGOUT</h1>
            </div>  
        </div>
            
        <div className='w-full h-full bg-gray-100 pt-[75px]'>
            {children}
        </div>



    </div>
  )
}

export default DashboardLayout