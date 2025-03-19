import React from "react";

const DeviceDetailsCard = ({ device, onClose }) => {
  if (!device) return null;

  console.log("Device Details:", device); // Debugging: Check the device object

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-black mb-4">Device Details</h2>
        <div className="flex flex-col gap-4">
          <div>
            <span className="font-semibold">Device Name:</span> {device.dname || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Device Unique Number:</span> {device.dnum}
          </div>
          <div>
            <span className="font-semibold">MAC Address:</span> {device.macid || "N/A"}
          </div>
          {device.status && (
            <div>
              <span className="font-semibold">Status:</span> {device.status || "N/A"}
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailsCard;