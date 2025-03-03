import React, { useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import Modal from './modal';

const Table = ({ data, onAddUser, onEditUser, onDeleteUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'delete', 'add'
  const itemsPerPage = 7;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page) => {
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pr-10 pl-10 pt-6 ">
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
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300 ">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.address}</td>
                <td className={`p-3 ${item.status === 'Active' ? 'text-green-500' : item.status === 'Inactive' ? 'text-orange-500' : 'text-red-500'}`}>{item.status}</td>
                <td className="p-3 flex space-x-2 ">
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => handleViewDetails(item)}><Eye size={16} /></button>
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer"><Edit size={16} /></button>
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer"><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-4">
        <button onClick={handlePrevious} className="px-3 py-1 border-[1px] border-gray-300 rounded cursor-pointer" disabled={currentPage === 1}>&lt;</button>
        <div className="flex space-x-1 ml-2 cursor-pointer">
          {[...Array(5)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={`px-3 py-1 gap-0 border-[1px] border-gray-300 rounded cursor-pointer ${currentPage === index + 1 ? 'bg-blue-600 text-white' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={handleNext} className="px-3 py-1 border-[1px] border-gray-300 rounded ml-2 cursor-pointer" disabled={currentPage === totalPages}>&gt;</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} user={selectedUser} />
    </div>
  );
};

export default Table;