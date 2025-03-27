import React from "react";

const DashboardCard = (props) => {
    return(
     <div className="flex  hover:bg-[#2899CB] w-[220px] h-[44px] rounded-r-3xl items-center " onClick={props.onClick}>
                    <img className="relative w-[18.666667938232422px] h-[18.666667938232422px] ml-[19px]" src={props.src} alt="Vector" />
                    <h1 className="ml-[10px] font-normal text-base text-white">{props.name}</h1>
                </div>
)
}

export default DashboardCard;