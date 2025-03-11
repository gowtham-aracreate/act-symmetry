import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, user, mode, onSave, onEdit, onDelete, setModalMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', status: '' });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'edit') {
      onEdit(formData);
    } else {
      onSave(formData);
    }
    onClose(); // Close the modal after saving or editing
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-[#2899CB] font-bold">
            {mode === 'edit' ? 'EDIT USER DETAILS' : mode === 'delete' ? 'DELETE USER' : 'VIEW USER DETAILS'}
          </h2>
          <button onClick={onClose} className="text-black bg-white cursor-pointer text-lg font-bold">X</button>
        </div>
        <hr className="w-full my-4" />
        {mode === 'view' ? (
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
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => setFormData(user) || setModalMode('edit')} className="bg-[#2899CB] text-white font-bold py-2 px-4 rounded cursor-pointer">Edit</button>
              <button onClick={() => setModalMode('delete')} className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer">Delete</button>
              <button onClick={onClose} className="bg-[#2899CB] text-white font-bold py-2 px-4 rounded cursor-pointer">Close</button>
            </div>
          </div>
        ) : mode === 'delete' ? (
          <div className="space-y-2 mt-5 gap-3">
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button onClick={() => onDelete(user)} className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer">Confirm</button>
              <button onClick={onClose} className="bg-[#2899CB] text-white font-bold py-2 px-4 rounded cursor-pointer">Cancel</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2 mt-5 gap-3">
            <div className="flex flex-col">
              <label><strong>Username</strong></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label><strong>Email ID</strong></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label><strong>Address</strong></label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label><strong>Status</strong></label>
              <div className="flex flex-row gap-6 pt-[5px]">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                /> Active
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={handleChange}
                /> Inactive
                <input
                  type="radio"
                  name="status"
                  value="Block"
                  checked={formData.status === 'Block'}
                  onChange={handleChange}
                /> Block
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-[#2899CB] text-white font-bold py-2 px-4 rounded cursor-pointer">Save</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;