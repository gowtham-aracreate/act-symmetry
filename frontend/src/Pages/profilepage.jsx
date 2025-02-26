import React, {useState} from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import Modal from "../Components/modal";
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
       <div className="flex relative w-full  items-center pb-6" >
        <h1 className="pl-10  font-bold text-[32px] text-[#2899CB] ">PROFILE</h1>

        <div role="button" tabIndex={0} onClick={handleOpen} className="w-[112px] h-[47px] bg-[#2899CB] pt-[12px] pr-[24px] pb-[14px] pl-[24px] border-[1px] rounded-[4px] gap-[10px] border-[#2899CB] absolute right-5 ">
                    <p className="font-bold w-[64px] h-[19px] text-white text-base">CREATE</p>
        </div>


      </div>
        {/* onSubmit={handleSubmit} */}
        <Modal isOpen={isOpen}>
                    <div className="w-[400px] h-[525px] pt-[10px] left-120 top-10 bg-white rounded-[10px] border-[2px] border-gray-200 absolute ">
                        <div className="flex w-[400px]  h-[65px] border-gray-300 border-b-[1px] absolute top-0 left-0 pt-[10px] pl-[10px]" >
                              <h2 className=" w-[228px] h-[29px] text-[#2899CB] text-[20px] font-bold ml-[20px] mt-[10px] ">CREATE NEW USER</h2>
                              <img className="w-[24px] h-[24px] right-4 top-6 absolute" onClick={handleClose} src={close_button} alt="" />      
                        </div>
                        <div className="flex flex-col gap-3 items-center  mt-[65px]">
                             < CreateCard input="text" placeholder="Username"/>
                             < CreateCard input="text" placeholder="Email ID" />
                             < CreateCard input="text" placeholder="Address - Building name" />
                             < CreateCard input="text" placeholder="Locality / city" />
                             < CreateCard input="text" placeholder="State Code" />
                             < CreateCard input="text" placeholder="Password" />
                             < CreateCard input="text" placeholder="Pin" />
                        
                        </div>

                        <div className="flex flex-row gap-4 pt-[5px] pl-[40px]">
                            <input className="" type="checkbox" name="Active" id="" />Active
                            <input type="checkbox" name="Inactive" id="" />Inactive
                            <input type="checkbox" name="Block" id="" />Block
                        </div>
                        <div className="flex flex-row gap-2 absolute right-3 pt-[10px]">
                        <div role="button" tabIndex={0} onClick={handleClose} className="w-[112px] h-[47px] pt-[12px] pr-[24px] pb-[14px] pl-[24px] border-[1px] rounded-[4px] gap-[10px] border-[#2899CB] ">
                            <p className="font-semibold w-[64px] h-[19px] text-[#2899CB] text-base">CANCEL</p>
                        </div>
                        <div role="button" tabIndex={0} onClick={handleSubmit} className="w-[112px] h-[47px] bg-[#2899CB] pt-[12px]  pl-[40px] border-[1px] rounded-[4px] gap-[10px] border-[#2899CB]  ">
                            <p className="font-semibold w-[64px] h-[19px] text-white text-base">SAVE</p>
                        </div>
                        </div>
                        </div>
                     
                   </Modal>
        <label htmlFor="action">
            <input className="items-center content-center w-[372px] h-[48px] ml-[44px] border-[1px] rounded-[7px] border-[#9C9C9C] bg-white" type="text" placeholder="search" />
              </label>

      </DashboardLayout>
    );
}

export default ProfilePage;