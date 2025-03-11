import React, { useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import ViewCard from './Viewcard';

const Table = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="pr-10 pl-10 pt-6">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-[#2899CB] text-white">
              <th className="p-3 text-left"><input type="checkbox" /></th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Email ID</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3">{item.username}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.address}</td>
                <td className={`p-3 ${item.status === 'Active' ? 'text-green-500' : item.status === 'Inactive' ? 'text-orange-500' : 'text-red-500'}`}>{item.status}</td>
                <td className="p-3 flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700" onClick={handleOpen}><Eye size={16} /></button>
                  <button className="text-gray-500 hover:text-gray-700" ><Edit size={16} /></button>
                  <button className="text-gray-500 hover:text-gray-700"><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span></span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border-[1px] border-gray-300 rounded">&lt;</button>
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} className={`px-3 py-1 gap-0 border-[1px] border-gray-300 rounded ${num === 1 ? 'bg-blue-600 ' : ''}`}>{num}</button>
          ))}
          <button className="px-3 py-1 border-[1px] border-gray-300 rounded">&gt;</button>
        </div>
      </div>
      {isOpen && (
       
            <ViewCard onClose={handleClose} />
            
          
      )}
    </div>
  );
};

export default Table;