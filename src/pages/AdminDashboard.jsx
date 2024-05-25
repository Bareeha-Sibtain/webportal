import React, { useState, useEffect } from 'react';
import DeviceForm from '../component/DeviceForm';
import { realTimeDb, db } from '../firebase/firebase';
import { ref, onValue, set } from 'firebase/database';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminDashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [devices, setDevices] = useState({});
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch devices from Realtime Database
    const deviceRef = ref(realTimeDb, 'Device');
    onValue(deviceRef, (snapshot) => {
      setDevices(snapshot.val());
    });

    // Fetch users from Firestore
    const fetchUsers = async () => {
      try {
        const userCollection = collection(db, 'users');
        const userSnapshot = await getDocs(userCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenModal = (deviceKey) => {
    setSelectedDevice({ key: deviceKey, ...devices[deviceKey] });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedDevice(null);
  };

  const updateDevice = (deviceKey, userData) => {
    const deviceRef = ref(realTimeDb, `Device/${deviceKey}/user`);
    set(deviceRef, userData);
  };

  return (
    <>
      <div className='flex justify-center items-center mx-auto mt-20'>
        <table className="border-collapse border border-slate-400 table-auto">
          <thead>
            <tr>
              <th className="border border-slate-300 px-4 py-5 bg-indigo-600 text-white">Device Name</th>
              <th className="border border-slate-300 px-4 py-5 bg-indigo-600 text-white"> Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(devices).map((key) => (
              <tr key={key}>
                <td className="border border-slate-300 px-3 py-3">{key}</td>
                <td className="border border-slate-300 px-3 py-3">
                  <button
                    onClick={() => handleOpenModal(key)}
                    className="bg-indigo-400 p-2 text-white"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedDevice && (
          <DeviceForm
            show={openModal}
            handleClose={handleCloseModal}
            device={selectedDevice}
            updateDevice={updateDevice}
            users={users}
          />
        )}
      </div>
    </>
  );
}
