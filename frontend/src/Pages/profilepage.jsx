import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Components/Button';
import CreateCard from '../Components/CreateCard';
import DashboardLayout from '../Layouts/DashboardLayout';
import Table from '../Components/Table';
import './login.css';

function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    address: '',
    locality: '',
    statecode: '',
    password: '',
    pin: '',
    status: 'Active',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/createdUsers')
      .then(response => { setData(response.data); console.log(response.data); })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-500';
      case 'Inactive':
        return 'text-orange-500';
      case 'Block':
        return 'text-red-500';
      default:
        return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/createExtended', newUser)
      .then(response => {
        console.log(response.data);
        setData([...data, response.data]);
        setNewUser({ name: '', email: '', address: '', locality: '', statecode: '', password: '', pin: '', status: 'Active' });
        setIsOpen(false);
      })
      .catch(error => console.error('Error creating user:', error));
  };

  const handleEditUser = (updatedUser) => {
    axios.put(`http://localhost:4000/updateUser/${updatedUser.email}`, updatedUser)
      .then(response => {
        const updatedData = data.map((user) =>
          user.email === updatedUser.email ? response.data : user
        );
        setData(updatedData);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDeleteUser = (user) => {
    axios.delete(`http://localhost:4000/deleteUser/${user.email}`)
      .then(response => {
        const updatedData = data.filter((item) => item.email !== user.email);
        setData(updatedData);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const filteredData = data.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = ["Name", "Email", "Address", "Status"];

  return (
    <DashboardLayout>
      <div className="flex">
        <div className="w-full ">
          <div>
            <div className="flex relative w-full items-center pb-6">
              <div className="absolute right-10">
                <div role='button' className="bg-blue-600 text-white hover:bg-black cursor-pointer font-bold py-2 px-4 rounded " onClick={handleOpen}>
                  CREATE
                </div>
              </div>
              <h1 className="pl-10 font-bold text-[32px] text-blue-600">PROFILE</h1>
            </div>
            <div className="pl-10 mb-6">
              <div className="relative">
                <input
                  className="pl-10 h-9 w-64 border border-gray-400 rounded-md bg-white outline-0 bg-[url('/path/to/Search.png')] bg-no-repeat bg-[10px] bg-contain"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <Table
              columns={columns}
              data={filteredData}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
              getStatusColor={getStatusColor}
            />
          </div>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center  bg-opacity-90">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl text-black font-bold">Create New User</h2>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-5 justify-center mt-5">
                    <CreateCard placeholder="Username" name="name" onChange={handleChange} />
                    <CreateCard placeholder="Email ID" name="email" onChange={handleChange} />
                    <CreateCard placeholder="Address" name="address" onChange={handleChange} />
                    <CreateCard placeholder="Locality / city" name="locality" onChange={handleChange} />
                    <CreateCard input="text" placeholder="State Code" name="statecode" onChange={handleChange} />
                    <CreateCard type="password" placeholder="Password" name="password" onChange={handleChange} />
                    <CreateCard type="number" placeholder="Pin" name="pin" onChange={handleChange} />
                    <div className="flex flex-row gap-6 pt-[5px]">
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
                    <div className="flex flex-row gap-2 pt-8 justify-end">
                      <div role='button' className="bg-blue-600 text-white cursor-pointer hover:bg-black font-bold py-2 px-4 rounded " id="btn" onClick={handleClose}>
                        Cancel
                      </div>
                      <Button className="bg-blue-600 text-white cursor-pointer hover:bg-black font-bold py-2 px-4 rounded" id="btn" type="submit">
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