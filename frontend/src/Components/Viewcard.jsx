import React from "react";
import close_button from '../assets/images/close_button.png'

const ViewCard = ({onClose}) => {

    
    return(
        <div className="fixed  inset-0 flex items-center justify-center bg-opacity-75 ">
             <div className="bg-white h-[175px] w-[350px] rounded-lg shadow-lg">
                <div className="w-[350px] flex flex-row h-[50px] gap-25 border-b-2 pt-[15px] border-gray-300">
                    <h2 className="font-semibold text-lg text-[#2899CB]  pl-[30px]">VIEW USER DETAILS</h2>
                    <img className="w-[25px] h-[25px] "onClick={onClose} src={close_button} alt="" />
                </div>
                <div className="pt-[15px] pl-[30px] flex flex-col gap-1.5">
                    <h6 className="font-medium text-sm text-[#828282]">Username</h6>
                    <h6 className="font-medium text-sm text-[#828282]">Email ID</h6>
                    <h6 className="font-medium text-sm text-[#828282]">Address</h6>
                    <h6 className="font-medium text-sm text-[#828282]">Status</h6>
                </div>
                    </div>
        </div>
    )
}

export default ViewCard;