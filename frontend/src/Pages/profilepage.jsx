import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout";


function ProfilePage() {
    return (
      <DashboardLayout>
        <div className="flex relative h-[88px]">
              <h1 className="w-[171px] h-[40px] ml-[44px] font-bold text-[32px] text-[#2899CB] ">Profile</h1>
              <div className="w-[112px] h-[47px] bg-[#2899CB] pt-[12px] pr-[24px] pb-[14px] pl-[24px] border-[1px] rounded-[4px] gap-[10px] border-[#2899CB] absolute right-5 ">
                    <p className="font-bold w-[64px] h-[19px] text-white text-base">CREATE</p>
              </div>
        </div>
        <label htmlFor="action">
            <input className="items-center content-center w-[372px] h-[48px] ml-[44px] border-[1px] rounded-[7px] border-[#9C9C9C] bg-white" type="text" placeholder="search" />
              {/* <p className="flex ml-[10px] gap-2"><img className="w-[20px] h-[20px] pt-[2px]" src={search} alt="" />Search</p> */}
              </label>
      </DashboardLayout>
    );
}

export default ProfilePage;