import React, { useState } from 'react'
import vector from '../assets/images/vector.png'
import vectorHover from '../assets/images/deviceman_white.png'
import profile from '../assets/images/profile.png'
import profileHover from '../assets/images/profile_white.png'
import device_man from '../assets/images/device_man.png'
import device_manHover from '../assets/images/device_white.png'
import reports from '../assets/images/reports.png'
import reportsHover from '../assets/images/report_white.png'
import set_user from '../assets/images/set_user.png'
import set_userHover from '../assets/images/setuser_white.png'
import logout from '../assets/images/logout.png'
import admin_logo from '../assets/images/admin_logo.png'
import notification_head from '../assets/images/notification_head.png'
import profile_head from '../assets/images/profile_head.png'
import { useNavigate, useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
     const navigate = useNavigate();
     const location = useLocation();
     const [hoveredItem, setHoveredItem] = useState(null);
     const [sidebarVisible, setSidebarVisible] = useState(false);

     const isActive = (path) => location.pathname === path;

     const toggleSidebar = () => {
          setSidebarVisible(!sidebarVisible);
     };

     return (
          <div className='md:h-screen bg-gray-100 flex'>
               <header className='fixed top-0 left-0 w-full h-[65px] bg-white  flex items-center justify-between px-6'>
                    <img className='w-[60px] h-[40px] cursor-pointer' src={admin_logo} alt="Admin Logo" onClick={toggleSidebar} />
                    <div className='flex items-center space-x-4'>
                         <img className='w-[25px] h-[25px] cursor-pointer' src={notification_head} alt="Notifications" />
                         <img className='w-[25px] h-[25px] cursor-pointer' src={profile_head} alt="Profile" />
                    </div>
               </header>

               {sidebarVisible && (
                    <aside className="w-[296px] bg-white flex flex-col gap-4 h-screen pt-[80px] pl-[10px]">
                         <div
                              className={`flex items-center ${isActive('/dashboard') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`}
                              onClick={() => { navigate('/dashboard') }}
                              onMouseEnter={() => setHoveredItem('dashboard')}
                              onMouseLeave={() => setHoveredItem(null)}
                         >
                              <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={isActive('/dashboard') || hoveredItem === 'dashboard' ? vectorHover : vector} alt="Dashboard" />
                              <h1 className="ml-[10px]">Dashboard</h1>
                         </div>
                         <div
                              className={`flex items-center ${isActive('/profile') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`}
                              onClick={() => navigate("/profile")}
                              onMouseEnter={() => setHoveredItem('profile')}
                              onMouseLeave={() => setHoveredItem(null)}
                         >
                              <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={isActive('/profile') || hoveredItem === 'profile' ? profileHover : profile} alt="Profile" />
                              <h1 className="ml-[10px]">Profile</h1>
                         </div>
                         <div
                              className={`flex items-center ${isActive('/device-management') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`}
                              onClick={() => navigate('/device-management')}
                              onMouseEnter={() => setHoveredItem('device-management')}
                              onMouseLeave={() => setHoveredItem(null)}
                         >
                              <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={isActive('/device-management') || hoveredItem === 'device-management' ? device_manHover : device_man} alt="Device Management" />
                              <h1 className="ml-[10px]">Device Management</h1>
                         </div>
                         <div
                              className={`flex items-center ${isActive('/reports') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`}
                              onClick={() => navigate('/reports')}
                              onMouseEnter={() => setHoveredItem('reports')}
                              onMouseLeave={() => setHoveredItem(null)}
                         >
                              <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={isActive('/reports') || hoveredItem === 'reports' ? reportsHover : reports} alt="Reports" />
                              <h1 className="ml-[10px]">Reports</h1>
                         </div>
                         <div
                              className={`flex items-center ${isActive('/set-user-limits') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'} w-[220px] h-[44px] rounded-xl cursor-pointer transition-transform transform hover:scale-105`}
                              onClick={() => navigate('/set-user-limits')}
                              onMouseEnter={() => setHoveredItem('set-user-limits')}
                              onMouseLeave={() => setHoveredItem(null)}
                         >
                              <img className="w-[18.67px] h-[18.67px] ml-[19px]" src={isActive('/set-user-limits') || hoveredItem === 'set-user-limits' ? set_userHover : set_user} alt="Set User Limits" />
                              <h1 className="ml-[10px]">Set User Limits</h1>
                         </div>
                         <div
                              className="flex items-center w-[170px] absolute bottom-2 ml-[19px] text-black cursor-pointer transition-transform transform hover:scale-105"
                              onClick={() => navigate('/')}
                         >
                              <img className="w-50% h-50%" src={isActive('/') || hoveredItem === 'logout' ? logoutHover : logout} alt="Logout" />
                              <h1 className="ml-[3px]">LOGOUT</h1>
                         </div>
                    </aside>
               )}

               <main className='w-full h-full pt-[75px]'>
                    {children}
               </main>
          </div>
     )
}

export default DashboardLayout