import React from "react";

const Modal = ({isOpen, onClose, children}) => {
    if(!isOpen) return null;

    return (
        <div className="bg-black w-full" onClick={onClose}>
             <div className="bg-blue" onClick={(e) => e.stopPropagation()}>
                    {children}
             </div>
        </div>
    );
};

        export default Modal;