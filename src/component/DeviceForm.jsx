import React, { useState, useEffect } from 'react';
import './style.css';
import { toast } from 'react-toastify';

const DeviceForm = ({ show, handleClose, device, updateDevice, users }) => {
  const [userData, setUserData] = useState({
    name: '',
    location: '',
    uid: ''
  });

  useEffect(() => {
    if (device && device.user) {
      setUserData(device.user);
    }
  }, [device]);

  useEffect(() => {
    console.log("Received users:", users);  // Debug log
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserChange = (e) => {
    const selectedUser = users.find(user => user.id === e.target.value);
    setUserData({
      ...userData,
      name: selectedUser.name,
      location: selectedUser.location,
      uid: selectedUser.id
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDevice(device.key, userData);
    handleClose();
    toast.success("Successfully! Assign the Device to User")
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="closeBtn" onClick={handleClose}>&times;</span>
        <p><label htmlFor="userSelect" className='text-md capitalize text-indigo-400'>Device Name:</label> {device ? device.key : ''}</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex flex-row justify-start items-start">
            <label htmlFor="userSelect" className='text-md capitalize text-indigo-400'>Select User:</label>
            <select
              className='bg-indigo-300 text-white w-40 px-4 rounded ms-4'
              name="user"
              id="userSelect"
              onChange={handleUserChange}
              value={userData.uid || ''}
            >
              <option value="" disabled>Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.location}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex flex-row justify-start items-start">
            <label htmlFor="userName" className='text-md capitalize text-indigo-400'>Name of User:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="border-2 ms-2 px-3 rounded w-40 py-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="userLocation" className='text-md capitalize text-indigo-400'>Location of User:</label>
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleChange}
              className="border-2 ms-2 px-3 rounded w-50 py-1"
            />
          </div>
          <div className="mt-2">
            <button type="submit" className="bg-indigo-400 text-white w-20 px-2 rounded capitalize py-1">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeviceForm;
