import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import DashboardLayout from "../Layouts/DashboardLayout";
import Table from "../Components/Table"; // Reusing the Table component

const Reports = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [allData, setAllData] = useState([]); // Store all data
    const [filteredData, setFilteredData] = useState([]); // Store filtered data

    // Fetch data from `/user`, `/action-logs`, and `/mappingDevice` APIs
    const fetchData = async () => {
        try {
            const [userResponse, actionLogsResponse, mappingResponse] = await Promise.all([
                axios.get("http://localhost:4000/user"), // Fetch user data
                axios.get("http://localhost:4000/action-logs"), // Fetch action logs
                axios.get("http://localhost:4000/mappingDevice"), // Fetch device mappings
            ]);

            // Combine user data and action logs
            const combinedData = actionLogsResponse.data
                .filter((log) => log.action !== "DeviceMapped") // Exclude "DeviceMapped" from action logs
                .map((log) => {
                    const user = userResponse.data.find((u) => u.email === log.email) || {};
                    return {
                        name: user.name || "Unknown",
                        action: log.action === "UserCreated" ? "User Created" : log.action,
                        timestamp: new Date(log.timestamp).toLocaleString(),
                    };
                });

            // Add device mapping actions
            const mappingData = mappingResponse.data.map((mapping) => ({
                name: mapping.username,
                action: "Device Mapped",
                timestamp: new Date(mapping.createdAt).toLocaleString(), // Use correct timestamp
            }));

            setAllData([...combinedData, ...mappingData]); // Combine all data
            setFilteredData([...combinedData, ...mappingData]); // Initialize filtered data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Filter data based on search term
    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);

        // Filter data from `allData` based on `name` or `action`
        const filtered = allData.filter((item) =>
            item.name.toLowerCase().includes(searchValue) || // Check if `name` contains the search term
            item.action.toLowerCase().includes(searchValue) // Check if `action` contains the search term
        );
        setFilteredData(filtered);
    };

    const headers = [
        { label: "Name", key: "name" },
        { label: "Action", key: "action" },
        { label: "Timestamp", key: "timestamp" },
    ];

    return (
        <DashboardLayout>
            <div className="flex">
                <div className="w-full p-6 ">
                    <div>
                        <div className="flex relative w-full items-center pb-6">
                            <h1 className="pl-10 font-bold text-[32px] text-black">REPORTS</h1>
                            <div className="absolute right-0 pr-10">
                                <CSVLink
                                    data={filteredData}
                                    headers={headers}
                                    filename="reports.csv"
                                    className="bg-black text-white cursor-pointer font-bold py-2 px-4 rounded pt-3 pb-3"
                                >
                                    DOWNLOAD REPORT
                                </CSVLink>
                            </div>
                        </div>
                        <div className="pl-10 mb-6">
                            <input
                                type="text"
                                placeholder="Search by name or action..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="pl-4 h-9 w-64 border-[1px] rounded-md border-[#9C9C9C] outline-none"
                            />
                        </div>
                        <div className="">
                            <Table
                                columns={["Name", "Action", "Timestamp"]}
                                data={filteredData}
                                showEditAction={false} // Hide actions column
                                renderRow={(row, columns) =>
                                    columns.map((column, colIndex) => (
                                        <td key={colIndex} className="border border-gray-300 p-3 text-center">
                                            {column === "Name" && row.name}
                                            {column === "Action" && row.action}
                                            {column === "Timestamp" && row.timestamp}
                                        </td>
                                    ))
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;