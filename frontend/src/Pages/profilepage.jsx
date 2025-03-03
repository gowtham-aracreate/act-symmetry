import React, { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import Table from '../Components/Table';
import Button from '../Components/Button';
import CreateCard from '../Components/CreateCard';

function ProfilePage() {



    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([
    ]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        address: '',
        locality: '',
        statecode: '',
        password: '',
        pin: '',
        status: 'Active',
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
        console.log(newUser);
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setData([...data, newUser]);
        setNewUser({ username: '', email: '', address: '', locality: '', statecode: '', password: '', status: 'Active' }); // Reset form fields after submission
        setIsOpen(false);
    };

    const filteredData = data.filter(row =>
        row.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex">
                <div className="w-full p-6">
                    <div className={`${isOpen ? 'bg-gray-300 bg-opacity-90' : ''}`}>
                        <div className="flex relative w-full items-center pb-6">
                            <h1 className="pl-10 font-bold text-[32px] text-[#2899CB]">PROFILE</h1>
                            <div className="absolute right-10">
                                <Button className="bg-[#2899CB] font-bold py-2 px-4 rounded" onClick={handleOpen}>
                                    CREATE
                                </Button>
                            </div>
                        </div>
                        <div className="pl-10 mb-6">
                            <input
                                className="pl-2 h-9 w-64 border-[1px] rounded-md border-[#9C9C9C] bg-white outline-0"
                                type="text"
                                placeholder="🔍 Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <Table data={filteredData} />
                    </div>
                    {isOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl text-blue-500 font-bold">Create New User</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-5 items-center mt-5">
                                        <CreateCard input="text" placeholder="Username" name="username" onChange={handleChange} />
                                        <CreateCard input="text" placeholder="Email ID" name="email" onChange={handleChange} />
                                        <CreateCard input="text" placeholder="Address" name="address" onChange={handleChange} />
                                        <CreateCard input="text" placeholder="Locality / city" name="locality" onChange={handleChange} />
                                        <CreateCard input="text" placeholder="State Code" name="statecode" onChange={handleChange} />
                                        <CreateCard input="text" placeholder="Password" name="password" onChange={handleChange} />
                                        <CreateCard input="text" placeholder="Pin" name="pin" onChange={handleChange} />

                                        

                                        <div className="flex flex-row gap-6 pt-[5px] justify-start">

                                            <input
                                                type="radio"
                                                name="status"
                                                value="Active"
                                                checked={newUser.status === 'Active'}
                                                onChange={handleChange}
                                            /> Active
                                            <input
                                                type="radio"
                                                name="status"
                                                value="Inactive"
                                                checked={newUser.status === 'Inactive'}
                                                onChange={handleChange}
                                            /> Inactive
                                            <input
                                                type="radio"
                                                name="status"
                                                value="Block"
                                                checked={newUser.status === 'Block'}
                                                onChange={handleChange}
                                            /> Block
                                        </div>
                                        <div className="flex flex-row gap-2 pt-[10px]">
                                            <Button className="font-bold py-2 px-4 rounded" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            <Button className="font-bold py-2 px-4 rounded" type="submit" onClick={handleSubmit}>
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ProfilePage;
