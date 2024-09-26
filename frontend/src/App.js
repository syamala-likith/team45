import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home.js';
import Registration from './components/register.js';
import Login from './components/adminLogin.js';
import AdminDashboard from './components/adminHome.js'
import UserLogin from './components/userLogin.js';
import UserHome from './components/userHome.js';
import ManagementLogin from './components/managementLogin.js';
import ManagementHome from './components/managementHome.js';
import AllTickets from './components/adminGetAllTickets.js';
import InProgressTickets from './components/AdminGetInProgressTickets.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/admin" element={<Login/>} />
          <Route path="/admin/home" element={<AdminDashboard/>} />
          <Route path="/user/login" element={<UserLogin/>} />
          <Route path="/user/home" element={<UserHome/>} />
          <Route path="/management/login" element={<ManagementLogin/>} />
          <Route path="/management/home" element={<ManagementHome/>} />
          <Route path="/admin/getAllTickets" element={<AllTickets/>} />
          <Route path="/admin/getInProgressTickets" element={<InProgressTickets/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
