import React, { useEffect, useState } from 'react';
import { realTimeDb } from '../firebase/firebase';
import { onValue, ref } from 'firebase/database';
import { RiAlertFill } from 'react-icons/ri';
import './style.css'
import Spinner from '../component/Spinner';


export default function Details() {
    const [deviceInfo, setDeviceInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const deviceRef = ref(realTimeDb, 'Device');
        onValue(deviceRef, (snapshot) => {
            const devices = snapshot.val();
            setDeviceInfo(devices);
            console.log(devices.motion);
            setIsLoading(false)
        });
    
    }, []);

    if (isLoading) {
        return <Spinner />
    }

    const getStatusStyle = (status) => {
        return {
            backgroundColor: status === 1 ? 'green' : 'red',
            color: 'white'
        };
    };

    return (
        <div className='flex justify-center items-center mx-auto mt-20 px-4 sm:px-6 lg:px-8'>
            <div className='w-full overflow-x-auto'>
                <table className="border-collapse border border-slate-400 w-full">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">Device Name</th>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">System Status</th>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">User Name</th>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">Location</th>
                            <th className="border border-slate-300 px-2 sm:px-4 py-2 sm:py-5 bg-indigo-600 text-white">Alert</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deviceInfo && Object.keys(deviceInfo).map((key) => (
                            <tr key={key} className={deviceInfo[key].motion.value === 1 || deviceInfo[key].sound.value === 1 ? 'blink-animation' : ''}>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">{key}</td>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">
                                    <p className='w-10 h-10 text-center p-2 rounded-full flex justify-center items-center'  style={getStatusStyle(deviceInfo[key].system_status)}>
                                        {deviceInfo[key].system_status === 0 ? `OFF` : `ON`}
                                    </p>
                                </td>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">{deviceInfo[key].user ? deviceInfo[key].user.name : 'N/A'}</td>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">{deviceInfo[key].user ? deviceInfo[key].user.location : 'N/A'}</td>
                                <td className="border border-slate-300 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-base">
                                    {(deviceInfo[key].motion.value === 1 || deviceInfo[key].sound.value === 1) && <RiAlertFill className="text-yellow-500 text-3xl" />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
