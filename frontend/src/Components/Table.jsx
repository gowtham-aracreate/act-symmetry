import React, { useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import Modal from "./Modals";

const Table = ({ data, columns, onEditUser, onDeleteUser, showActions, viewMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'delete', 'add'
  const itemsPerPage = 4;
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

  const handleEditDevice = (device) => {
    setSelectedDevice(device); // Set the selected device for editing
    setModalMode('edit'); // Set the modal mode to 'edit'
    setIsModalOpen(true); // Open the modal
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-500';
      case 'Inactive':
        return 'text-orange-500';
      case 'Block':
        return 'text-red-500';
      default:
        return '';
    }
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columnWidth = `${100 / (columns.length + 1.5)}%`; // +1.5 to account for S.No (0.5) and Actions (1) columns

  return (
    <div className="pr-10 pl-10 pt-6 ">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-[#0A2463] text-white">
              <th className="pt-3 pb-3 text-center w-1/12">S.no</th>
              {columns.map((column, index) => (
                <th key={index} className="pt-3 pb-3 text-center w-1/5 whitespace-nowrap">{column.header}</th>
              ))}
              <th className="pt-3 pb-3 text-center w-1/5">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="pt-3 pb-3 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="pt-3 pb-3 text-center">{item[column.accessor]}</td>
                ))}
                <td className="pt-3 pb-3 text-center flex justify-center items-center space-x-2">
                  <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => handleViewDetails(item)}><Eye size={16} /></button>
                  {showActions && (
                    <>
                      <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => handleEditUser(item)}><Edit size={16} /></button>
                      <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => handleDeleteUser(item)}><Trash size={16} /></button>
                    </>
                  )}
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
              className={`px-3 py-1 gap-0 border-[1px] border-gray-300 rounded cursor-pointer ${currentPage === index + 1 ? 'bg-black text-white' : ''}`}
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
          viewMode={viewMode} // Pass the viewMode prop to the Modal component
        />
      )}
    </div>
  );
};

export default Table;