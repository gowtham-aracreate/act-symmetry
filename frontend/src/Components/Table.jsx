import React, { useState } from "react";
import { Eye, Edit, Trash } from "lucide-react";
import Modal from './Modals';

const Table = ({ data, onViewDetails, onEditUser, onDeleteUser, columns, showDeviceColumns, showEditDeleteActions = true, renderRow }) => {
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
    onViewDetails(user);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
    onEditUser(user);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setModalMode('delete');
    setIsModalOpen(true);
    onDeleteUser(user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columnWidth = `${100 / (columns.length + 1.5)}%`;

  return (
    <div className="pr-10 pl-10 pt-6">
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-3 text-center" style={{ width: `calc(${columnWidth} / 2)` }}>S.No</th>
              {columns.map((column, index) => (
                <th key={index} className="p-3 text-center" style={{ width: columnWidth }}>
                  {column}
                </th>
              ))}
              <th className="p-3 text-center" style={{ width: columnWidth }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-3 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                {renderRow
                  ? renderRow(item, columns) // Use the custom renderRow function if provided
                  : columns.map((column, colIndex) => (
                      <td key={colIndex} className="p-3 text-center">
                        {item[column.toLowerCase().replace(/\s+/g, '').replace('device', '')] || "N/A"}
                      </td>
                    ))}
                <td className="p-3 text-center flex justify-center items-center space-x-2">
                  {/* View Action */}
                  <button
                    className="text-gray-500 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleViewDetails(item)}
                  >
                    <Eye size={16} />
                  </button>
                  {/* Conditionally Render Edit and Delete Actions */}
                  {showEditDeleteActions && (
                    <>
                      <button
                        className="text-gray-500 hover:text-blue-800 cursor-pointer"
                        onClick={() => handleEditUser(item)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-600 cursor-pointer"
                        onClick={() => handleDeleteUser(item)}
                      >
                        <Trash size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={handlePrevious}
          className="px-3 py-1 border-[1px] border-gray-300 rounded cursor-pointer"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <div className="flex space-x-1 ml-2 cursor-pointer">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={`px-3 py-1 gap-0 border-[1px] border-gray-300 rounded cursor-pointer ${
                currentPage === index + 1 ? 'bg-black text-white' : ''
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="px-3 py-1 border-[1px] border-gray-300 rounded ml-2 cursor-pointer disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        mode={modalMode}
        onSave={onEditUser}
        onDelete={onDeleteUser}
        setModalMode={setModalMode}
      />
    </div>
  );
};

export default Table;