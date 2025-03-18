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
    const [errorMessage, setErrorMessage] = useState('');
    const [newDevice, setNewDevice] = useState({
        dname: '',
        dnum: '',
        macid: '',
    });
    const [data, setData] = useState([]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setErrorMessage('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDevice({ ...newDevice, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous errors

        try {
            const response = await axios.post("http://localhost:4000/newdevice", newDevice);
            if (response.status === 201) {
                setNewDevice({ dname: "", dnum: "", macid: "" });
                setIsOpen(false);
                fetchData(); // Refresh the data
            }
        } catch (error) {
            if (error.response?.data?.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Failed to create device.');
            }
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
        const updatedData = data.map((device) =>
            device._id === updatedDevice._id ? updatedDevice : device
        );
        setData(updatedData);
    };

    const handleDeleteDevice = async (deviceId) => {
        try {
            await axios.delete(`http://localhost:4000/newdevice/${deviceId}`);
            const updatedData = data.filter((device) => device._id !== deviceId);
            setData(updatedData);
        } catch (error) {
            console.error("Error deleting device:", error);
        }
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
                    <h1 className="pl-10 font-semibold text-[32px] text-blue-600">Device Management</h1>
                    <div className="absolute right-9">
                        <Button className="bg-blue-600 text-white border-blue-600 border-[1px] font-bold py-2 px-4 rounded" onClick={handleOpen}>
                            ADD DEVICE
                        </Button>
                    </div>
                </div>
                <div className="ml-10 mr-9 flex flex-row gap-14 border-b-2 border-gray-200 w-auto">
                    <div className="cursor-pointer flex flex-col items-start" onClick={() => handleTabClick('mapping')}>
                        <h1 className={`font-semibold text-[20px] hover:text-red-600 ${activeTab === 'mapping' ? 'text-blue-600' : ''}`}>
                            Device Mapping
                        </h1>
                        <div className={`w-full border-b-2 ${activeTab === 'mapping' ? 'border-red-600' : 'border-transparent'} mt-1`}></div>
                    </div>
                    <div className="cursor-pointer flex flex-col items-start" onClick={() => handleTabClick('addition')}>
                        <h1 className={`font-semibold text-[20px] hover:text-red-600 ${activeTab === 'addition' ? 'text-blue-600' : ''}`}>
                            Device Addition
                        </h1>
                        <div className={`w-full border-b-2 ${activeTab === 'addition' ? 'border-red-600' : 'border-transparent'} mt-1`}></div>
                    </div>
                </div>
                <div className="pl-10 mb-6 mt-4">
                    <input
                        className="pl-4 h-9 w-64 border-[1px] rounded-md border-[#9C9C9C] outline-none"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                {activeTab === 'mapping' && (
                    <Table
                        columns={["Device Name", "Device Unique Number", "MAC ID"]}
                        data={filteredData}
                        onEditUser={handleEditDevice}
                        onDeleteUser={handleDeleteDevice}
                        showDeviceColumns={true}
                    />
                )}

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl text-blue-600 font-bold">ADD NEW DEVICE</h2>

                            {errorMessage && (
                                <div className="text-red-600 mb-4">{errorMessage}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-5 justify-center mt-5">
                                    <CreateCard placeholder="Device Name" name="dname" value={newDevice.dname} onChange={handleChange} />
                                    <CreateCard placeholder="Device Number" name="dnum" value={newDevice.dnum} onChange={handleChange} />
                                    <CreateCard placeholder="MAC Address" name="macid" value={newDevice.macid} onChange={handleChange} />
                                </div>
                                <div className="flex flex-row gap-2 pt-8 justify-end">
                                    <Button className="bg-gray-400 text-white font-bold py-2 px-4 rounded" onClick={handleClose}>
                                        CANCEL
                                    </Button>
                                    <Button className="bg-blue-600 text-white font-bold py-2 px-4 rounded" type="submit">
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
