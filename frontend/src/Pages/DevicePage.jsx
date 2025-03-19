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
                    <h1 className="pl-10 font-semibold text-[32px] text-black">Device Management</h1>
                    <div className="absolute right-9">
                        <Button className="bg-black text-white border-black border-[1px] font-bold py-2 px-4 rounded" onClick={handleOpen}>
                            ADD DEVICE
                        </Button>
                    </div>
                </div>
                <div className="ml-10 mr-9 flex flex-row gap-14 border-b-2 border-gray-200 w-auto">
                    <div className="cursor-pointer flex flex-col items-start" onClick={() => handleTabClick('mapping')}>
                        <h1 className={`font-semibold text-[20px] text-black hover:text-red-600 ${activeTab === 'mapping' ? 'text-black' : ''}`}>
                            Device Addition
                        </h1>
                        <div className={`w-full border-b-2 ${activeTab === 'mapping' ? 'border-red-600' : 'border-transparent'} mt-1`}></div>
                    </div>
                    <div className="cursor-pointer flex flex-col items-start" onClick={() => handleTabClick('addition')}>
                        <h1 className={`font-semibold text-[20px] text-black hover:text-red-600 ${activeTab === 'addition' ? 'text-black' : ''}`}>
                            Device Mapping
                        </h1>
                        <div className={`w-full border-b-2 ${activeTab === 'addition' ? 'border-red-600' : 'border-transparent'} mt-1`}></div>
                    </div>
                </div>
                <div className="pl-10 mb-6 mt-4">
                    <div className="relative">
                        <input
                            className="pl-10 h-9 w-64 border-[1px] rounded-md border-[#9C9C9C] bg-white outline-0 bg-[url('/path/to/search-icon.png')] bg-no-repeat bg-[10px] bg-contain"
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                {
                    activeTab === 'mapping' && (
                        <Table
                            columns={["Device Name", "Device Unique Number", "MAC ID"]}
                            data={filteredData}
                            onEditUser={handleEditDevice}
                            onDeleteUser={handleDeleteDevice}
                        />
                    )
                }
                {
                    activeTab === 'addition' && (
                        <Table
                            columns={["Username", "Added Device", "Status"]}
                            data={filteredData}
                            onEditUser={handleEditDevice}
                            onDeleteUser={handleDeleteDevice}
                        />
                    )
                }
                {
                    isOpen && (
                        <div className="fixed inset-0 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl text-black font-bold">ADD NEW DEVICE</h2>

                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-5 justify-center mt-5">
                                        <CreateCard placeholder="Device Name" name="dname" value={newUsers.dname} onChange={handleChange} />
                                        <CreateCard placeholder="Device Number" name="dnum" value={newUsers.dnum} onChange={handleChange} />
                                        <CreateCard placeholder="MAC Address" name="macid" value={newUsers.macid} onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-row gap-2 pt-8 justify-end">
                                        <Button className="bg-black text-white border-1 border-black cursor-pointer font-bold py-2 px-4 rounded" id="btn" onClick={handleClose}>
                                            CANCEL
                                        </Button>
                                        <Button className="font-bold py-2 px-4 rounded border-1 border-black text-white bg-black" id="btn" type="submit">
                                            SAVE
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        </DashboardLayout>
    );
};

export default DevicePage;