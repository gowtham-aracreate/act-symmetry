import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../Layouts/DashboardLayout";
import Button from "../Components/Button";
import Table from "../Components/Table";
import CreateCard from "../Components/CreateCard";
import DeviceDetailsCard from "../Components/DeviceDetailsCard";

const DevicePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("mapping"); // Default tab is "mapping"
  const [searchTerm, setSearchTerm] = useState("");
  const [newDevice, setNewDevice] = useState({
    dname: "",
    dnum: "",
    macid: "",
  });
  const [data, setData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null); // For viewing device details
  const [deviceAdditions, setDeviceAdditions] = useState([
    {
      username: "Admin",
      addedDevice: "",
      status: "Active",
    }
  ]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedUserForMap, setSelectedUserForMap] = useState(null);
  const [mappingForm, setMappingForm] = useState({
    username: "",
    device: "",
    status: "Active"
  });
  const [mappedDevices, setMappedDevices] = useState(() => {
    const savedMappings = localStorage.getItem('mappedDevices');
    return savedMappings ? JSON.parse(savedMappings) : [];
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/newdevice", newDevice);
      if (response.status === 201) {
        setData([...data, response.data.device]); // Add the new device to the table
        setNewDevice({ dname: "", dnum: "", macid: "" }); // Reset the form
        setIsOpen(false); // Close the modal
      }
    } catch (error) {
      console.error("Error adding device:", error);
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

  useEffect(() => {
    localStorage.setItem('mappedDevices', JSON.stringify(mappedDevices));
  }, [mappedDevices]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDevice = (device) => {
    // Determine what type of data we're viewing based on the active tab
    const viewData = activeTab === "mapping" ? 
      {
        "Device Name": device["device name"],
        "Device Number": device["device unique number"],
        "MAC ID": device["mac id"]
      } :
      {
        "Username": device["username"],
        "Device": device["added device"],
        "Status": device["status"]
      };
    
    setSelectedDevice(viewData);
  };

  const handleCloseDeviceDetails = () => {
    setSelectedDevice(null); // Close the device details card
  };

  // Add this function to get available devices (not yet mapped)
  const getAvailableDevices = () => {
    const mappedDeviceNames = mappedDevices.map(md => md["added device"]);
    return data.filter(device => !mappedDeviceNames.includes(device.dname));
  };

  // Update the handleDeleteDevice function
  const handleDeleteDevice = async (device) => {
    if (activeTab === "mapping") {
      try {
        await axios.delete(`http://localhost:4000/deleteDevice/${device._id}`);
        const updatedData = data.filter((item) => item._id !== device._id);
        setData(updatedData);
      } catch (error) {
        console.error("Error deleting device:", error);
      }
    } else {
      // For mapped devices table - device will be available again in dropdown
      const updatedMappedDevices = mappedDevices.filter(
        (item) => item._id !== device._id
      );
      setMappedDevices(updatedMappedDevices);
    }
  };

  const handleMapOpen = () => setIsMapModalOpen(true);
  const handleMapClose = () => setIsMapModalOpen(false);

  const handleMapDevice = (device) => {
    const newMappedDevice = {
      username: "Admin", // Replace with actual selected user
      "added device": device.dname,
      status: "Active",
      _id: device._id
    };
    setDeviceAdditions([...deviceAdditions, newMappedDevice]);
    setIsMapModalOpen(false);
  };

  const handleMapFormChange = (e) => {
    const { name, value } = e.target;
    setMappingForm({ ...mappingForm, [name]: value });
  };

  const handleMapSubmit = async (e) => {
    e.preventDefault();
    const newMapping = {
      username: mappingForm.username,
      "added device": mappingForm.device,
      status: mappingForm.status,
      _id: Date.now() // temporary ID for demo
    };
    const updatedMappings = [...mappedDevices, newMapping];
    setMappedDevices(updatedMappings);
    setMappingForm({ username: "", device: "", status: "Active" });
    setIsMapModalOpen(false);
  };

  const filteredData = data.filter((device) =>
    device.dname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.dnum.toString().includes(searchTerm.toLowerCase()) ||
    device.macid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mappingTableData = filteredData.map((device) => ({
    "device name": device.dname,
    "device unique number": device.dnum,
    "mac id": device.macid,
    _id: device._id
  }));

  const additionTableData = mappedDevices.length > 0 ? mappedDevices : [];

  return (
    <DashboardLayout>
      <div className="overflow-x-auto">
        <div className="flex w-full items-center pb-6">
          <h1 className="pl-10 font-semibold text-[32px] text-black">Device Management</h1>
          <div className="absolute right-9">
            {activeTab === "mapping" ? (
              <Button
                className="bg-black text-white border-black border-[1px] font-bold py-2 px-4 rounded"
                onClick={handleOpen}
              >
                ADD DEVICE
              </Button>
            ) : (
              <Button
                className="bg-black text-white border-black border-[1px] font-bold py-2 px-4 rounded"
                onClick={handleMapOpen}
              >
                MAP DEVICE
              </Button>
            )}
          </div>
        </div>
        <div className="ml-10 mr-9 flex flex-row gap-14 border-b-2 border-gray-200 w-auto">
          <div
            className="cursor-pointer flex flex-col items-start"
            onClick={() => handleTabClick("mapping")}
          >
            <h1
              className={`font-semibold text-[20px] text-black hover:text-red-600 ${
                activeTab === "mapping" ? "text-black" : ""
              }`}
            >
              Device Addition
            </h1>
            <div
              className={`w-full border-b-2 ${
                activeTab === "mapping" ? "border-red-600" : "border-transparent"
              } mt-1`}
            ></div>
          </div>
          <div
            className="cursor-pointer flex flex-col items-start"
            onClick={() => handleTabClick("addition")}
          >
            <h1
              className={`font-semibold text-[20px] text-black hover:text-red-600 ${
                activeTab === "addition" ? "text-black" : ""
              }`}
            >
              Device Mapping
            </h1>
            <div
              className={`w-full border-b-2 ${
                activeTab === "addition" ? "border-red-600" : "border-transparent"
              } mt-1`}
            ></div>
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
        {activeTab === "mapping" && (
          <Table
            columns={["Device Name", "Device Unique Number", "MAC ID"]}
            data={mappingTableData}
            onEditUser={null}  // Set to null to disable edit functionality
            onDeleteUser={handleDeleteDevice}
            showEditAction={false}  // Add this prop to hide edit button
            onViewDetails={handleViewDevice}  // Add this prop
          />
        )}
        {activeTab === "addition" && (
          <Table
            columns={["Username", "Added Device", "Status"]}
            data={additionTableData}
            onEditUser={null}  
            onDeleteUser={handleDeleteDevice}
            showEditAction={false} 
            onViewDetails={handleViewDevice}  // Add this prop
          />
        )}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl text-black font-bold">ADD NEW DEVICE</h2>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 justify-center mt-5">
                  <CreateCard
                    placeholder="Device Name"
                    name="dname"
                    value={newDevice.dname}
                    onChange={handleChange}
                  />
                  <CreateCard
                    placeholder="Device Number"
                    name="dnum"
                    value={newDevice.dnum}
                    onChange={handleChange}
                  />
                  <CreateCard
                    placeholder="MAC Address"
                    name="macid"
                    value={newDevice.macid}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row gap-2 pt-8 justify-end">
                  <Button
                    className="bg-black text-white border-1 border-black cursor-pointer font-bold py-2 px-4 rounded"
                    id="btn"
                    onClick={handleClose}
                  >
                    CANCEL
                  </Button>
                  <Button
                    className="font-bold py-2 px-4 rounded border-1 border-black text-white bg-black"
                    id="btn"
                    type="submit"
                  >
                    SAVE
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        {isMapModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl text-black font-bold">Map Device</h2>
              <form onSubmit={handleMapSubmit}>
                <div className="flex flex-col gap-5 justify-center mt-5">
                  <CreateCard
                    placeholder="Username"
                    name="username"
                    value={mappingForm.username}
                    onChange={handleMapFormChange}
                  />
                  <select
                    name="device"
                    value={mappingForm.device}
                    onChange={handleMapFormChange}
                    className="pl-4 h-9 w-full border-[1px] rounded-md border-[#9C9C9C] outline-none"
                  >
                    <option value="">Select Device</option>
                    {getAvailableDevices().map((device) => (
                      <option key={device._id} value={device.dname}>
                        {device.dname}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-row gap-6 pt-[5px]">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={mappingForm.status === 'Active'}
                        onChange={handleMapFormChange}
                      />
                      <span className="ml-1">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={mappingForm.status === 'Inactive'}
                        onChange={handleMapFormChange}
                      />
                      <span className="ml-1">Inactive</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Block"
                        checked={mappingForm.status === 'Block'}
                        onChange={handleMapFormChange}
                      />
                      <span className="ml-1">Block</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-row gap-2 pt-8 justify-end">
                  <Button
                    className="bg-black text-white border-1 border-black cursor-pointer font-bold py-2 px-4 rounded"
                    onClick={handleMapClose}
                  >
                    CANCEL
                  </Button>
                  <Button
                    className="font-bold py-2 px-4 rounded border-1 border-black text-white bg-black"
                    type="submit"
                  >
                    MAP
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        {selectedDevice && (
          <DeviceDetailsCard
            device={selectedDevice}
            onClose={handleCloseDeviceDetails}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DevicePage;