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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDevice = (device) => {
    console.log("Viewing Device:", device);
    setSelectedDevice(device); // Set the selected device for viewing
  };

  const handleCloseDeviceDetails = () => {
    setSelectedDevice(null); // Close the device details card
  };

  const handleEditDevice = async (updatedDevice) => {
    try {
      const response = await axios.put(`http://localhost:4000/updateDevice/${updatedDevice._id}`, updatedDevice);
      const updatedData = data.map((device) =>
        device._id === updatedDevice._id ? response.data : device
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  const handleDeleteDevice = async (device) => {
    try {
      await axios.delete(`http://localhost:4000/deleteDevice/${device._id}`);
      const updatedData = data.filter((item) => item._id !== device._id);
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
          <h1 className="pl-10 font-semibold text-[32px] text-black">Device Management</h1>
          <div className="absolute right-9">
            <Button
              className="bg-black text-white border-black border-[1px] font-bold py-2 px-4 rounded"
              onClick={handleOpen}
            >
              ADD DEVICE
            </Button>
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
              Device Mapping
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
              Device Addition
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
            data={filteredData.map((device) => ({
              dname: device.dname,
              dnum: device.dnum,
              macid: device.macid,
            }))}
            renderRow={(device, columns) => (
              columns.map((column, colIndex) => (
                <td key={colIndex} className="p-3 text-center">
                  {column === "Device Name" && device.dname}
                  {column === "Device Unique Number" && device.dnum}
                  {column === "MAC ID" && device.macid}
                </td>
              ))
            )}
            onViewDetails={(device) => handleViewDevice(device)}
            showDeviceColumns={true}
            showEditDeleteActions={false}
          />
        )}
        {activeTab === "addition" && (
          <Table
            columns={["Username", "Added Device", "Status"]}
            data={filteredData.map((device) => ({
              name: device.dname, // Replace with actual username if available
              email: device.dname,
              address: device.status || "Pending", // Replace with actual status if available
            }))}
            onViewDetails={(device) => handleViewDevice(device)}
            showDeviceColumns={false}
            showEditDeleteActions={false} // Disable Edit and Delete actions
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