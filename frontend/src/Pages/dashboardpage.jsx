import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import Card from "../Components/card";
import profile_black from "../assets/images/profile_black.png";
import device_black from "../assets/images/device_black.png";
import reports_black from "../assets/images/reports_black.png";
import setuser_black from "../assets/images/setuser_black.png";

function DashboardPage() {
    return (
      <DashboardLayout>
        <h1 className="w-[171px] h-[40px] ml-[44px] font-bold text-[32px] text-[#2899CB] ">Dashboard</h1>
        <div className="grid grid-cols-3">
       <Card 
       name="Profile"
       src={profile_black} />
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