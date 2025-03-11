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
import DashboardCard from '../Components/DashboardCard'

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

        <div className="md:w-[296px]  bg-[#272C48] flex flex-col gap-4 h-screen py-[80px] pl-[10px]">
        <DashboardCard name="Dashboard" src={vector}  />
        <DashboardCard name="Profile" src={profile} onClick={() => navigate("/profile")} />
        <DashboardCard name="Device Management" src={device_man} onClick={() => navigate("/device-management")}  />
        <DashboardCard name="Reports" src={reports}  />
        <DashboardCard name="Set User Limits" src={set_user}  />
            <div className="flex w-[170px] absolute ml-[19px] bottom-2 justify-start">
                 <img className="relative w-[18px] h-[18px] ml-[19px]" src={logout} alt="Logout" />
                 <h1 className="ml-[10px] font-normal text-base text-white">LOGOUT</h1>
            </div>  
        </div>
            
        <div className='w-full h-full bg-gray-100 pt-[75px]'>
            {children}
        </div>



    </div>
  )
}

export default DashboardLayout