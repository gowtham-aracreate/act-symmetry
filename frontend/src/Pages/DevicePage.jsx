import React, { useState, useEffect } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import Button from '../Components/Button';
import Table from "../Components/Table";

const DevicePage = () => {
  const [activeTab, setActiveTab] = useState('mapping');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API or any other source
    const fetchData = async () => {
      // Replace with your data fetching logic
      const response = await fetch('https://api.example.com/devices');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditDevice = (updatedDevice) => {
    // Logic to handle editing a device
    const updatedData = data.map((device) =>
      device.id === updatedDevice.id ? updatedDevice : device
    );
    setData(updatedData);
  };

  const handleDeleteDevice = (deviceId) => {
    // Logic to handle deleting a device
    const updatedData = data.filter((device) => device.id !== deviceId);
    setData(updatedData);
  };

  const filteredData = data.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="overflow-x-auto">
        <div className="flex w-full items-center pb-6">
          <h1 className="pl-10 font-semibold text-[32px] text-[#2899CB]">Device Management</h1>
          <div className="absolute right-9">
            <div className="bg-[#2899CB] text-white border-[#2899CB] border-[1px] font-bold py-2 px-4 rounded">
              ADD DEVICE
            </div>
          </div>
        </div>
        <div className="ml-10 mr-9 flex flex-row gap-14 border-b-2 border-gray-200 w-auto">
          <div className="cursor-pointer flex flex-col items-start" onClick={() => handleTabClick('mapping')}>
            <h1 className={`font-semibold text-[20px] text-[#7E7E7E] hover:text-[#2899CB] ${activeTab === 'mapping' ? 'text-[#2899CB]' : ''}`}>
              Device Mapping
            </h1>
            <div className={`w-full border-b-2 ${activeTab === 'mapping' ? 'border-[#2899CB]' : 'border-transparent'} mt-1`}></div>
          </div>
          <div className="cursor-pointer flex flex-col items-start" onClick={() => handleTabClick('addition')}>
            <h1 className={`font-semibold text-[20px] text-[#7E7E7E] hover:text-[#2899CB] ${activeTab === 'addition' ? 'text-[#2899CB]' : ''}`}>
              Device Addition
            </h1>
            <div className={`w-full border-b-2 ${activeTab === 'addition' ? 'border-[#2899CB]' : 'border-transparent'} mt-1`}></div>
          </div>
        </div>
        <div className="pl-10 mb-6 mt-4">
          <input
            className="pl-2 h-9 w-64 border-[1px] rounded-md border-[#9C9C9C] bg-white outline-0"
            type="text"
            placeholder="🔍 Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {activeTab === 'mapping' && (
          <Table
            name="Device Name"
            number="Device Unique Number"
            status="MAC ID"
            action="Actions"
            data={filteredData}
            onEditUser={handleEditDevice}
            onDeleteUser={handleDeleteDevice}
          />
        )}
        {activeTab === 'addition' && (
          <Table
            name="Username"
            number="Added Device"
            status="Status"
            action="Actions"
            data={filteredData}
            onEditUser={handleEditDevice}
            onDeleteUser={handleDeleteDevice}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DevicePage;