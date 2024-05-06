import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './component/Navbar'; // Make sure the import path is correct
import Login from './pages/LoginPage';
import Signup from './pages/Signup';
import HomePage from './pages/Homepage';
import History from './pages/History';
import UserDetail from './pages/UserContact';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />  
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }/>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="history" element={<History />} />
          <Route path="user" element={<UserDetail />} />
          {/* <Route path="setting" element={<History />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
