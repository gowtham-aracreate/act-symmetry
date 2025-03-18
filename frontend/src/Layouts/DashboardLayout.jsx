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
// import DashboardCard from '../Components/DashboardCard'
import { useNavigate, useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
     const navigate = useNavigate();
     const location = useLocation();

     const isActive = (path) => location.pathname === path;

     return (
          <div className='md:h-screen bg-gray-100 flex'>
               <header className='fixed top-0 left-0 w-full h-[65px] bg-white  flex items-center justify-between px-6'>
                    <img className='w-[60px] h-[40px]' src={admin_logo} alt="Admin Logo" />
                    <div className='flex items-center space-x-4'>
                         <img className='w-[25px] h-[25px] cursor-pointer' src={notification_head} alt="Notifications" />
                         <img className='w-[25px] h-[25px] cursor-pointer' src={profile_head} alt="Profile" />
                    </div>
               </header>

               <aside className="w-[296px] bg-white flex flex-col gap-4 h-screen pt-[80px] pl-[10px] ">
                    <div className={`flex items-center ${isActive('/dashboard') ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`} onClick={() => { navigate('/dashboard') }}>
                         <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={vector} alt="Dashboard" />
                         <h1 className="ml-[10px]">Dashboard</h1>
                    </div>
                    <div className={`flex items-center ${isActive('/profile') ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`} onClick={() => navigate("/profile")}>
                         <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={profile} alt="Profile" />
                         <h1 className="ml-[10px]">Profile</h1>
                    </div>
                    <div className={`flex items-center ${isActive('/device-management') ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`} onClick={() => navigate('/device-management')}>
                         <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={device_man} alt="Device Management" />
                         <h1 className="ml-[10px]">Device Management</h1>
                    </div>
                    <div className={`flex items-center ${isActive('/reports') ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`} onClick={() => navigate('/reports')}>
                         <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={reports} alt="Reports" />
                         <h1 className="ml-[10px]">Reports</h1>
                    </div>
                    <div className={`flex items-center ${isActive('/set-user-limits') ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`} onClick={() => navigate('/set-user-limits')}>
                         <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={set_user} alt="Set User Limits" />
                         <h1 className="ml-[10px]">Set User Limits</h1>
                    </div>
                    <div className="flex items-center w-[170px] absolute bottom-2 ml-[19px] cursor-pointer" onClick={() => navigate('/')}>
                         <img className="w-50% h-50%" src={logout} alt="Logout" />
                         <h1 className="ml-[3px]">LOGOUT</h1>
                    </div>
               </aside>

               <main className='w-full h-full pt-[75px]'>
                    {children}
               </main>
          </div>
     )
}

export default DashboardLayout