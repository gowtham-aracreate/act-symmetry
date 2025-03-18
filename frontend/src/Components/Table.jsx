import React, { useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import Modal from './Modals';

const Table = ({ data, onEditUser, onDeleteUser, columns, showDeviceColumns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const itemsPerPage = 5;
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

  const columnWidth = `${100 / (columns.length + 1.5)}%`; 

  return (
    <div className="pr-10 pl-10 pt-6 ">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-center" style={{ width: `calc(${columnWidth} / 2)` }}>S.No</th>
              {columns.map((column, index) => (
                <th key={index} className="p-3 text-center" style={{ width: columnWidth }}>
                  {column}
                </th>
              ))}
              <th className="p-3 text-center" style={{ width: columnWidth}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300 ">
                <td className="p-3 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                {showDeviceColumns ? (
                  <>
                    <td className="p-3 text-center">{item.dname}</td>
                    <td className="p-3 text-center">{item.dnum}</td>
                    <td className="p-3 text-center">{item.macid}</td>
                  </>
                ) : (
                  <>
                    <td className="p-3 text-center">{item.name}</td>
                    <td className="p-3 text-center">{item.email}</td>
                    <td className="p-3 text-center">{item.address}</td>
                    <td className={`p-3 text-center ${getStatusColor(item.status)}`}>{item.status}</td>
                  </>
                )}
                <td className="p-3 text-center flex justify-center items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => handleViewDetails(item)}><Eye size={16} /></button>
                  <button className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => handleEditUser(item)}><Edit size={16} /></button>
                  <button className="text-red-600 hover:text-red-800 cursor-pointer" onClick={() => handleDeleteUser(item)}><Trash size={16} /></button>
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
              className={`px-3 py-1 gap-0 border-[1px] border-gray-300 rounded cursor-pointer ${currentPage === index + 1 ? 'bg-blue-600 text-white' :''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={handleNext} className="px-3 py-1 border-[1px] border-gray-300 rounded ml-2 cursor-pointer disabled:opacity-50" disabled={currentPage === totalPages}>&gt;</button>
      </div>
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
    </div>
  );
};

export default Table;