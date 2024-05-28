import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './component/Navbar'; // Make sure the import path is correct
import Login from './pages/LoginPage';
import Signup from './pages/Signup';
import HomePage from './pages/Homepage';
import History from './pages/History';
import UserContact from './pages/UserContact';
import AdminDashboard from './pages/AdminDashboard';
import AdminHome from './pages/AdminHome';
import Details from './pages/Details';
import UserProfile from './pages/UserProfile'
import Header from './component/Header';
import Users from './pages/Users';
import HistoryPage from './pages/History';
import ChangePassword from './pages/ChangePassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
   <>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/admin' element={<AdminHome />}>
            <Route index  element={<Details />} />
            <Route path='editdevice' element={<AdminDashboard />} />
            <Route path='userdetails' element={<Users />} />
          </Route>
          <Route path='/user' element={<HomePage />}>
            <Route index element={<Header /> } />
            <Route path='profile' element={<UserProfile />} />
            <Route path='neighbour' element={<UserContact />} />
            <Route path='setting' element={<ChangePassword />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>

    <ToastContainer />
   </>
  );
}


export default App;
