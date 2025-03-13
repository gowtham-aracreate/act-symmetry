import React, { useState, useEffect } from "react";
import axios from 'axios';
import DashboardLayout from "../Layouts/DashboardLayout";
import Button from '../Components/Button';
import Table from "../Components/Table";
import CreateCard from "../Components/CreateCard";

const DevicePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mapping');
  const [searchTerm, setSearchTerm] = useState('');
  const [newUsers, setNewUser] = useState({
      dname: '',
      dnum: '',
      macid: '',
    });
  const [data, setData] = useState([]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => setNewUser({ ...newUsers, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:4000/newdevice", newUsers);
  
      if (response.status === 201) {
        setNewUser({ dname: "", dnum: "", macid: "" });
        setIsOpen(false);
  
        // Fetch updated data to reflect new entry
        fetchData();
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/newdevice");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
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
    device.dname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.dnum.toString().includes(searchTerm.toLowerCase()) ||
    device.macid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="overflow-x-auto">
        <div className="flex w-full items-center pb-6">
          <h1 className="pl-10 font-semibold text-[32px] text-[#2899CB]">Device Management</h1>
          <div className="absolute right-9">
            <Button className="bg-[#2899CB] text-black border-[#2899CB] border-[1px] font-bold py-2 px-4 rounded" onClick={handleOpen}>
              ADD DEVICE
            </Button>
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
         {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl text-[#2899CB] font-bold">ADD NEW DEVICE</h2>
      
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-5 justify-center mt-5">
                    <CreateCard placeholder="Device Name" name="dname" value={newUsers.dname} onChange={handleChange} />
                    <CreateCard placeholder="Device Number" name="dnum" value={newUsers.dnum} onChange={handleChange} />
                    <CreateCard placeholder="MAC Address" name="macid" value={newUsers.macid} onChange={handleChange} />
                  </div>
                  <div className="flex flex-row gap-2 pt-8 justify-end">
                    <Button className="bg-[#2899CB] text-[#2899CB] border-1 border-[#2899CB] cursor-pointer font-bold py-2 px-4 rounded" id="btn" onClick={handleClose}>
                      CANCEL
                    </Button>
                    <Button className="font-bold py-2 px-4 rounded border-1 border-[#2899CB] text-[#2899CB] bg-[#2899CB]" id="btn" type="submit">
                      SAVE
                    </Button>
                  </div>
                </form>
              </div>
            </div>
         )}
      </div>
    </DashboardLayout>
  );
};

export default DevicePage;