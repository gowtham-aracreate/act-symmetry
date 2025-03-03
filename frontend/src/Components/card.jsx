import React from "react";



const Card = (props) => {
    return (
        <div className=" w-full" >
          <div className="w-[235px] h-[130px] rounded-[20px] border-[2px] border-[#FFCB05] ml-[37px] mt-[50px] pt-[25px] bg-gradient-to-r from-[#272C48] to-[#2899CB] justify-items-center  shadow-2xl hover:scale-110" onClick={props.onclick}>
             <div className=" bg-white w-[50px] h-[50px] rounded-[129px] pt-[10px] pl-[10px]  hover:scale-105">
               <img className=" w-[30px] h-[30px]" src={props.src} alt="profile" />
               
             </div>
             <h1 className=" font-semibold text-[16px] text-white pt-2">{props.name}</h1>
          </div>
      </div>
    );
};
export default Card;