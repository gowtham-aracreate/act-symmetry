import React, { useState, useEffect } from "react";
import axios from 'axios';
import DashboardLayout from "../Layouts/DashboardLayout";
import Button from '../Components/Button';
import Table from "../Components/Table";
import CreateCard from "../Components/CreateCard";

const DevicePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('deviceAddition');
  const [searchTerm, setSearchTerm] = useState('');
  const [newDevice, setNewDevice] = useState({
    name: '',
    dname: '',
    dnum: '',
    macid: '',
    status: 'Active'
  });
  const [data, setData] = useState([]);
  const [mappingData, setMappingData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/newdevice')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));

    axios.get('http://localhost:4000/deviceMapping')
      .then(response => setMappingData(response.data))
      .catch(error => console.error('Error fetching mapping data:', error));
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => setNewDevice({ ...newDevice, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting new device:', newDevice);
    if (activeTab === 'deviceAddition') {
      axios.post('http://localhost:4000/newdevice', newDevice)
        .then(response => {
          console.log('Device created:', response.data);
          setData([...data, response.data.device]); // Ensure the correct data is added to the device addition table
          setNewDevice({ name: '', dname: '', dnum: '', macid: '', status: 'Active' });
          setIsOpen(false);
        })
        .catch(error => {
          console.error('Error creating device:', error);
          alert('Error creating device');
        });
    } else if (activeTab === 'deviceMapping') {
      axios.post('http://localhost:4000/deviceMapping', newDevice)
        .then(response => {
          console.log('Device mapping created:', response.data);
          setMappingData([...mappingData, response.data.mapping]); // Ensure the correct data is added to the device mapping table
          setNewDevice({ mname: '', mnum: '', status: 'Active' });
          setIsOpen(false);
        })
        .catch(error => {
          console.error('Error creating device mapping:', error);
          alert('Error creating device mapping');
        });
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditDevice = (updatedDevice) => {
    axios.put(`http://localhost:4000/updateDevice/${updatedDevice.id}`, updatedDevice)
      .then(response => {
        const updatedData = data.map((device) =>
          device.id === updatedDevice.id ? response.data : device
        );
        setData(updatedData);

        const updatedMappingData = mappingData.map((device) =>
          device.id === updatedDevice.id ? response.data : device
        );
        setMappingData(updatedMappingData);
      })
      .catch(error => {
        console.error('Error updating device:', error);
        alert('Error updating device');
      });
  };

  const handleDeleteDevice = (device) => {
    axios.delete(`http://localhost:4000/deleteDevice/${device.id}`)
      .then(response => {
        const updatedData = data.filter((item) => item.id !== device.id);
        setData(updatedData);

        const updatedMappingData = mappingData.filter((item) => item.id !== device.id);
        setMappingData(updatedMappingData);
      })
      .catch(error => {
        console.error('Error deleting device:', error);
        alert('Error deleting device');
      });
  };

  const filteredData = data.filter(device =>
    (device.dname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (device.dnum || '').toString().includes(searchTerm.toLowerCase()) ||
    (device.macid || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMappingData = mappingData.filter(device =>
    (device.mname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (device.mnum || '').toString().includes(searchTerm.toLowerCase()) ||
    (device.status || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deviceAdditionColumns = [
    { header: 'Device Name', accessor: 'dname' },
    { header: 'Device Unique Number', accessor: 'dnum' },
    { header: 'MAC ID', accessor: 'macid' },
  ];

  const deviceMappingColumns = [
    { header: 'Username', accessor: 'mname' },
    { header: 'Added Device', accessor: 'mnum' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <DashboardLayout>
      <div className="overflow-x-auto">
        <div className="flex w-full items-center pb-6">
          <h1 className="pl-10 font-semibold text-[32px] text-[#2899CB]">Device Management</h1>
          <div className="absolute right-9">
            {activeTab === 'deviceAddition' && (
              <Button className="bg-[#2899CB] text-black border-[#2899CB] border-[1px] font-bold py-2 px-4 rounded" onClick={handleOpen}>
                ADD DEVICE
              </Button>
            )}
            {activeTab === 'deviceMapping' && (
              <Button className="bg-[#2899CB] text-black border-[#2899CB] border-[1px] font-bold py-2 px-4 rounded" onClick={handleOpen}>
                MAP DEVICE
              </Button>
            )}
          </div>
        </div>
        <div className="ml-10 mr-9 flex flex-row gap-14 border-b-2 border-gray-200 w-auto">
          <div className="cursor-pointer flex flex-col items-start" onClick={() => handleTabClick('deviceAddition')}>
            <h1 className={`font-semibold text-[20px] text-[#7E7E7E] hover:text-[#2899CB] ${activeTab === 'deviceAddition' ? 'text-[#2899CB]' : ''}`}>
              Device Addition
            </h1>
            <div className={`w-full border-b-2 ${activeTab === 'deviceAddition' ? 'border-[#2899CB]' : 'border-transparent'} mt-1`}></div>
          </div>
          <div className="cursor-pointer flex flex-col items-start" onClick={() => handleTabClick('deviceMapping')}>
            <h1 className={`font-semibold text-[20px] text-[#7E7E7E] hover:text-[#2899CB] ${activeTab === 'deviceMapping' ? 'text-[#2899CB]' : ''}`}>
              Device Mapping
            </h1>
            <div className={`w-full border-b-2 ${activeTab === 'deviceMapping' ? 'border-[#2899CB]' : 'border-transparent'} mt-1`}></div>
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
        {activeTab === 'deviceAddition' && (
          <Table
            columns={deviceAdditionColumns}
            data={filteredData}
            onEditUser={handleEditDevice}
            onDeleteUser={handleDeleteDevice}
            showActions={true} // Show all action buttons
            viewMode="deviceAddition" // Pass the viewMode prop
          />
        )}
        {activeTab === 'deviceMapping' && (
          <Table
            columns={deviceMappingColumns}
            data={filteredMappingData}
            onEditUser={handleEditDevice}
            onDeleteUser={handleDeleteDevice}
            showActions={true} // Show all action buttons
            viewMode="deviceMapping" // Pass the viewMode prop
          />
        )}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-800">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl text-[#2899CB] font-bold">{activeTab === 'deviceAddition' ? 'ADD NEW DEVICE' : 'MAP DEVICE'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 justify-center mt-5">
                  {activeTab === 'deviceAddition' && (
                    <CreateCard placeholder="Device Name" name="dname" value={newDevice.dname} onChange={handleChange} />
                  )}
                  {activeTab === 'deviceAddition' && (
                    <CreateCard placeholder="Device Number" name="dnum" value={newDevice.dnum} onChange={handleChange} />
                  )}
                  {activeTab === 'deviceAddition' && (
                    <CreateCard placeholder="MAC Address" name="macid" value={newDevice.macid} onChange={handleChange} />
                  )}
                  {activeTab === 'deviceMapping' && (
                    <CreateCard placeholder="Username" name="name" value={newDevice.name} onChange={handleChange} />
                  )}
                  {activeTab === 'deviceMapping' && (
                    <CreateCard placeholder="Device Mapping" name="dmap" onChange={handleChange} />
                  )}
                  {activeTab === 'deviceMapping' && (
                    <div className="flex flex-row gap-6 pt-[5px]">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={newDevice.status === 'Active'}
                        onChange={handleChange}
                      /> Active
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={newDevice.status === 'Inactive'}
                        onChange={handleChange}
                      /> Inactive
                    </div>
                  )}
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