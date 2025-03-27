import React, { useState } from 'react'
import vector from '../assets/images/vector.png'
import vectorHover from '../assets/images/deviceman_white.png'
import profile from '../assets/images/profile.png'
import profileHover from '../assets/images/profile_white.png'
import device_man from '../assets/images/device_man.png'
import device_manHover from '../assets/images/device_white.png'
import reports from '../assets/images/reports.png'
import reportsHover from '../assets/images/report_white.png'

import logout from '../assets/images/logout.png'
import admin_logo from '../assets/images/admin_logo.png'
import notification_head from '../assets/images/notification_head.png'
import profile_head from '../assets/images/profile_head.png'
// import DashboardCard from '../Components/DashboardCard'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isExpanded, setIsExpanded] = useState(true);

    const isActive = (path) => location.pathname === path;

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogoClick = (e) => {
        // Only toggle sidebar when clicking admin logo
        if (e.target.alt === "Admin Logo") {
            setIsExpanded(!isExpanded);
        }
    };

    const handleLogout = async () => {
     const email = localStorage.getItem("email"); // Retrieve email from localStorage
     try {
         // Log the logout action to the backend
         await axios.post("http://localhost:4000/log-action", { email, action: "Logout" });
 
         // Remove token and email from localStorage
         localStorage.removeItem("token");
         localStorage.removeItem("email");
 
         // Navigate to the login page
         navigate("/");
     } catch (error) {
         console.error("Error logging out:", error);
         alert("Error logging out");
     }
 };

    return (
        <div className='md:h-screen bg-gray-100 flex'>
            <header className='fixed top-0 left-0 w-full h-[65px] bg-white flex items-center justify-between px-6 z-50'>
                <img 
                    className='w-[60px] h-[40px] cursor-pointer' 
                    src={admin_logo} 
                    alt="Admin Logo" 
                    onClick={handleLogoClick}  // Changed to handleLogoClick
                />
                <div className='flex items-center space-x-4'>
                    <img className='w-[25px] h-[25px] cursor-pointer' src={notification_head} alt="Notifications" />
                    <img className='w-[25px] h-[25px] cursor-pointer' src={profile_head} alt="Profile" />
                </div>
            </header>

            <aside className="fixed left-0 bg-white flex flex-col gap-4 h-screen pt-[80px] pl-[10px] transition-all duration-300 
              
            ">
                <div
                    className={`flex items-center ${
                        isActive('/dashboard') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'
                    } ${
                        isExpanded ? 'w-[220px] justify-start' : 'w-[60px] justify-center'
                    } h-[44px] rounded-xl cursor-pointer transition-all duration-300`}
                    onClick={() => handleNavigation('/dashboard')}  // Changed to handleNavigation
                    onMouseEnter={() => setHoveredItem('dashboard')}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <img 
                        className={`w-[18.67px] h-[18.67px] ${isExpanded ? 'ml-[19px]' : ''}`}
                        src={isActive('/dashboard') || hoveredItem === 'dashboard' ? vectorHover : vector} 
                        alt="Dashboard" 
                    />
                    {isExpanded && <h1 className="ml-[10px]">Dashboard</h1>}
                </div>

                <div
                    className={`flex items-center ${
                        isActive('/profile') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'
                    } ${
                        isExpanded ? 'w-[220px] justify-start' : 'w-[60px] justify-center'
                    } h-[44px] rounded-xl cursor-pointer transition-all duration-300 `}
                    onClick={() => handleNavigation("/profile")}
                    onMouseEnter={() => setHoveredItem('profile')}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <img 
                        className={`w-[18.67px] h-[18.67px] ${isExpanded ? 'ml-[19px]' : ''}`}
                        src={isActive('/profile') || hoveredItem === 'profile' ? profileHover : profile} 
                        alt="Profile" 
                    />
                    {isExpanded && <h1 className="ml-[10px]">Profile</h1>}
                </div>

                <div
                    className={`flex items-center ${
                        isActive('/device-management') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'
                    } ${
                        isExpanded ? 'w-[220px] justify-start' : 'w-[60px] justify-center'
                    } h-[44px] rounded-xl cursor-pointer transition-all duration-300 `}
                    onClick={() => handleNavigation('/device-management')}
                    onMouseEnter={() => setHoveredItem('device-management')}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <img 
                        className={`w-[18.67px] h-[18.67px] ${isExpanded ? 'ml-[19px]' : ''}`}
                        src={isActive('/device-management') || hoveredItem === 'device-management' ? device_manHover : device_man} 
                        alt="Device Management" 
                    />
                    {isExpanded && <h1 className="ml-[10px]">Device Management</h1>}
                </div>

                <div
                    className={`flex items-center ${
                        isActive('/reports') ? 'bg-black text-white' : 'hover:bg-black text-black hover:text-white'
                    } ${
                        isExpanded ? 'w-[220px] justify-start' : 'w-[60px] justify-center'
                    } h-[44px] rounded-xl cursor-pointer transition-all duration-300 `}
                    onClick={() => handleNavigation('/reports')}
                    onMouseEnter={() => setHoveredItem('reports')}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <img 
                        className={`w-[18.67px] h-[18.67px] ${isExpanded ? 'ml-[19px]' : ''}`}
                        src={isActive('/reports') || hoveredItem === 'reports' ? reportsHover : reports} 
                        alt="Reports" 
                    />
                    {isExpanded && <h1 className="ml-[10px]">Reports</h1>}
                </div>


                <div
                    className={`flex items-center ${
                        isExpanded ? 'w-[170px] justify-start ml-[19px]' : 'w-[60px] justify-center'
                    } absolute bottom-2 text-black cursor-pointer transition-all duration-300 `}
                    onClick={handleLogout}
                >
                    <img 
                        className={`w-[60px] h-[50px]`}
                        src={isActive('/') || hoveredItem === 'logout' ? logoutHover : logout} 
                        alt="Logout" 
                    />
                    {isExpanded && <h1 className="ml-[3px]">LOGOUT</h1>}
                </div>
            </aside>

            <main className={`w-full h-full pt-[75px] transition-all duration-300 ${isExpanded ? 'ml-[225px]' : 'ml-[80px]'}`}>
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout