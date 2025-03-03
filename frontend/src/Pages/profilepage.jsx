import React, { useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import close_button from "../assets/images/close_button.png";
import CreateCard from "../Components/CreateCard";

function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <DashboardLayout>
      <div className={`relative ${isOpen ? "bg-gray-500 bg-opacity-90" : ""}`}>
        <div className="flex w-full items-center pb-6">
          <h1 className="pl-10 font-bold text-[32px] text-[#2899CB]">PROFILE</h1>
          <div
            onClick={handleOpen}
            className="w-[112px] h-[47px] bg-[#2899CB] pt-[12px] pr-[24px] pb-[14px] pl-[24px] border-[1px] rounded-[4px] gap-[10px] border-[#2899CB] absolute right-5"
          >
            <p className="font-bold w-[64px] h-[19px] text-white text-base">CREATE</p>
          </div>
        </div>

        <label htmlFor="action">
          <input
            className="items-center content-center w-[372px] h-[48px] ml-[44px] border-[1px] rounded-[7px] border-[#9C9C9C] bg-white"
            type="text"
            placeholder="search"
          />
        </label>
      </div>

      {isOpen && (
        <div className="md:w-[400px] md:h-[525px] md:pt-[10px] md:left-120 md:top-0 bg-white rounded-[10px] border-[2px] border-gray-200 md:absolute">
          <div className="flex md:w-[400px] md:h-[65px] border-gray-300 md:border-b-[1px] md:absolute md:top-0 md:left-0 md:pt-[10px] md:pl-[10px]">
            <h2 className="md:w-[228px] md:h-[29px] text-[#2899CB] md:text-[20px] font-bold ml-[20px] mt-[10px]">CREATE NEW USER</h2>
            <img className="w-[24px] h-[24px] right-4 top-6 absolute cursor-pointer" onClick={handleClose} src={close_button} alt="Close" />
          </div>
          <div className="flex flex-col gap-3 items-center mt-[65px]">
            <CreateCard input="text" placeholder="Username" />
            <CreateCard input="text" placeholder="Email ID" />
            <CreateCard input="text" placeholder="Address - Building name" />
            <CreateCard input="text" placeholder="Locality / city" />
            <CreateCard input="text" placeholder="State Code" />
            <CreateCard input="text" placeholder="Password" />
            <CreateCard input="text" placeholder="Pin" />
          </div>
          <div className="flex flex-row gap-4 pt-[5px] pl-[40px]">
            <input className="" type="checkbox" name="Active" id="active" />Active
            <input type="checkbox" name="Inactive" id="inactive" />Inactive
            <input type="checkbox" name="Block" id="block" />Block
          </div>
          <div className="flex flex-row gap-2 absolute right-3 pt-[10px]">
            <button
              onClick={handleClose}
              className="w-[112px] h-[47px] bg-white pt-[12px] pr-[24px] pb-[14px] pl-[24px] border-[1px] rounded-[4px] gap-[10px] border-[#2899CB]"
            >
              <p className="font-semibold w-[64px] h-[19px] text-[#2899CB] text-base">CANCEL</p>
            </button>
            <div
              onClick={handleSubmit}
              className="w-[112px] h-[47px] bg-[#2899CB] pt-[12px] pl-[40px] border-[1px] rounded-[4px] gap-[10px] border-[#2899CB]"
            >
              <p className="font-semibold w-[64px] h-[19px] text-white text-base">SAVE</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default ProfilePage;