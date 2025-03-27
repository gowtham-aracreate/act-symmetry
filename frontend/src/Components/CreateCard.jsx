import React from "react";

const CreateCard = (props) => {
  return (
    <div className="hover:scale-95">
      <input
        className="md:w-[335px] sm:w-[50px] md:h-[36px] rounded-[10px] border-[1px] border-[#E3E5E5] content-center pl-[10px] outline-0"
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value} 
        onChange={props.onChange}
        required
      />
    </div>
  );
};

export default CreateCard;