import React from "react";



const Card = (props) => {
    return (
        <div className=" w-full" >
          <div className="w-[235px] h-[130px] rounded-[20px] border-[3px] border-[#2899CB] ml-[37px] mt-[50px] pt-[25px] bg-[#0A2463] justify-items-center  hover:scale-110 hover:bg-[#2899CB] hover:border-[#0A2463]" onClick={props.onclick}>
             <div className=" bg-white w-[50px] h-[50px] rounded-[129px] pt-[10px] pl-[10px]  hover:scale-105">
               <img className=" w-[30px] h-[30px]" src={props.src} alt="profile" />
               
             </div>
             <h1 className=" font-semibold text-[16px] text-white pt-2">{props.name}</h1>
          </div>
      </div>
    );
};
export default Card;