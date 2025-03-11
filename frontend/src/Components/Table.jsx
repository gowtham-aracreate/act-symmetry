import React, { useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import Modal from "./Modals";

const Table = ({ data, onEditUser, onDeleteUser, name, email, address, status, action, number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'delete', 'add'
  const itemsPerPage = 7;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
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
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleSaveUser = (updatedUser) => {
    onEditUser(updatedUser);
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const handleConfirmDeleteUser = (user) => {
    onDeleteUser(user);
    setIsModalOpen(false);
    setSelectedUser(null);
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
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-[#0A2463] text-white ">
              <th className="pt-3 pb-3 text-center w-1/12 "><input type="checkbox" /></th>
              <th className="pt-3 pb-3 text-center w-1/12 whitespace-nowrap ">{name}</th>
              <th className="pt-3 pb-3 text-center ">{email}</th>
              <th className="pt-3 pb-3 text-center w-1/12  whitespace-nowrap">{number}</th>
              <th className="pt-3 pb-3 text-center ">{address}</th>
              <th className="pt-3 pb-3 text-center w-1/4 ">{status}</th>
              <th className="pt-3 pb-3 text-center ">{action}</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300 ">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3 whitespace-nowrap">{item.number}</td>
                <td className="p-3">{item.address}</td>
                <td className={`p-3 ${item.status === 'Active' ? 'text-green-500' : item.status === 'Inactive' ? 'text-blue-500' : 'text-red-500'}`}>{item.status}</td>
                <td className="p-3 flex space-x-2 ">
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => handleViewDetails(item)}><Eye size={16} /></button>
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => handleEditUser(item)}><Edit size={16} /></button>
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => handleDeleteUser(item)}><Trash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-4">
        <button onClick={handlePrevious} className="px-3 py-1 border-[1px] border-gray-300 rounded cursor-pointer" disabled={currentPage === 1}>&lt;</button>
        <div className="flex space-x-1 ml-2 cursor-pointer">
          {[...Array(totalPages)].map((_, index) => (
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
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          mode={modalMode}
          onSave={handleSaveUser}
          onEdit={handleSaveUser}
          onDelete={handleConfirmDeleteUser}
          setModalMode={setModalMode}
        />
      )}
    </div>
  );
};

export default Table;