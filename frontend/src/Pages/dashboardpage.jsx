import React from "react";
import DashboardLayout from "../Layouts/dashboardLayout";
import Card from "../Components/card";
import profile_black from "../assets/images/profile_black.png";
import device_black from "../assets/images/device_black.png";
import reports_black from "../assets/images/reports_black.png";
import setuser_black from "../assets/images/setuser_black.png";
import {useNavigate } from "react-router-dom";

function DashboardPage() {

  const navigate =useNavigate()
    return (
      <DashboardLayout>
        <h1 className="w-[171px] h-[40px] ml-[44px] font-bold text-[32px] text-[#2899CB] ">DASHBOARD</h1>
        <div className="md:grid md:grid-cols-3 sm:grid sm:grid-cols-2">
       <Card 
       name="Profile"
       src={profile_black} 
       onclick ={()=>{navigate('/profile')}}/>
       <Card 
       name="Device Management"
       src={device_black}
       
        />
        <Card 
        name="Reports"
        src={reports_black} />
       </div>
       <div className="grid grid-cols-3 pt-[10px]">
       <Card 
       name="Set User Limits"
       src={setuser_black} />
       </div>
      </DashboardLayout>
    );
}

export default DashboardPage;