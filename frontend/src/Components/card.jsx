import React from "react";

const Card = (props) => {
    return (
        <div className="w-full">
            <div className="w-[250px] h-[140px] rounded-xl border-[3px] border-black ml-[37px] mt-[50px] pt-[17px] bg-blue-600 flex flex-col items-center justify-center hover:scale-110 hover:bg-black hover:border-blue-600" onClick={props.onclick}>
                <div className="bg-white w-[50px] h-[50px] rounded-full flex items-center justify-center hover:scale-105">
                    <img className="w-[30px] h-[30px]" src={props.src} alt="profile" />
                </div>
                <h1 className="font-semibold text-[16px] text-white pt-2">{props.name}</h1>
            </div>
        </div>
    );
};

export default Card;