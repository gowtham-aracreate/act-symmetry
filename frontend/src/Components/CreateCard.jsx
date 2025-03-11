import React from "react";


const CreateCard = (props) => {
  return (
    <div className="hover:scale-95">
      <input className="w-[325px] h-[40px] rounded-[10px] border-[1px] border-[#E3E5E5] content-center pl-[10px] outline-0 " type="text" placeholder={props.placeholder} required />
    </div>
  );
};


export default CreateCard;