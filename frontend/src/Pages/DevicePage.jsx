import React from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import Button from '../Components/Button';

const DevicePage = () => {
  return (
    <DashboardLayout>
      <div className="overflow-x-auto  ">
      <div className="flex w-full  items-center pb-6">
      <h1 className="pl-10 font-semibold text-[32px] text-[#2899CB]">Device Management</h1>
      <div className="absolute right-3">
          <Button className="bg-[#2899CB] text-[#2899CB] border-[#2899CB] border-[1px] font-bold py-2 px-4 rounded" >
                                    ADD DEVICE
          </Button>
      </div>
      </div>
      </div>
      <div className="flex h-[41px] fixed flex-row gap-4">
        <div><h1 className="pl-10 font-semibold text-[20px] hover:text-[#2899CB]">Device Mapping</h1></div>
        <div><h1 className="font-semibold text-[20px] hover:text-[#2899CB]">Device Addition</h1></div>
      </div>
    </DashboardLayout>
  );
};

export default DevicePage;