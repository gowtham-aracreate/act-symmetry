import React from 'react';

const Modal = ({ isOpen, onClose, user }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-[#2899CB] font-bold">VIEW USER DETAILS</h2>
          <button onClick={onClose} className="text-black bg-white cursor-pointer text-lg font-bold">X</button>
        </div>
        <hr className="w-full my-4" />
        <div className="space-y-2 mt-5 gap-3">
          <div className="flex">
            <p><strong>Username</strong></p>
            <p className="ml-14">{user.name}</p>
          </div>
          <div className="flex">
            <p><strong>Email ID</strong></p>
            <p className="ml-18">{user.email}</p>
          </div>
          <div className="flex">
            <p><strong>Address</strong></p>
            <p className="ml-18">{user.address}</p>
          </div>
          <div className="flex">
            <p><strong>Status</strong></p>
            <p className={`ml-22 ${user.status === 'Active' ? 'text-green-500' : user.status === 'Inactive' ? 'text-orange-500' : 'text-red-500'}`}>{user.status}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-[#2899CB] text-white font-bold py-2 px-4 rounded cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
