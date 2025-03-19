import React from "react";

const Card = (props) => {
    return (
        <div className="w-full">
            <div className="w-[280px] h-[170px] rounded-[20px] border-[3px] border-gray-700 ml-[37px] mt-[50px] pt-[17px] bg-gray-400 flex flex-col items-center justify-center hover:scale-110 hover:bg-blue-500 hover:border-blue800" onClick={props.onclick}>
                <div className="bg-white w-[50px] h-[50px] rounded-full flex items-center justify-center hover:scale-105">
                    <img className="w-[30px] h-[30px]" src={props.src} alt="profile" />
                </div>
                <h1 className="font-semibold text-[16px] text-white pt-2">{props.name}</h1>
            </div>
        </div>
    );
};

export default Card;