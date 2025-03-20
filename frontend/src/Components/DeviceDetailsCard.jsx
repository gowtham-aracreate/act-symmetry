import React from 'react';

const DeviceDetailsCard = ({ device, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-blue-400 font-bold">Device Details</h2>
          <button onClick={onClose} className="text-black bg-white cursor-pointer text-lg font-bold">X</button>
        </div>
        <hr className="w-full my-4" />
        <div className="space-y-4">
          {Object.entries(device).map(([key, value]) => (
            <div key={key} className="flex items-center">
              <span className="font-semibold w-40">{key}:</span>
              <span className={`${key === "Status" ? 
                value === "Active" ? "text-green-500" : 
                value === "Inactive" ? "text-blue-500" : 
                "text-red-500" : ""}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailsCard;