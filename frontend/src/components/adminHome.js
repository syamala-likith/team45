// src/components/AdminDashboard.js
import React, { useState } from 'react';
import './admin-dashboard.css'; // Import CSS for styling
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation


const AdminDashboard = ({ setUsers }) => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !password || !role) {
      alert('All fields are required');
      return;
    }
    console.log(name);

    const newData = {
        name,
      email,
      password,
    };

    if (role === 'student'){
        axios.post('http://localhost:4545/user/addUser', newData) // Adjust the endpoint as necessary
        .then(() => navigate('/admin/home')) // Redirect to login or wherever you need
        .catch(error => console.error('Error registering:', error));
    }

    if (role === 'management'){
        axios.post('http://localhost:4545/management/addManagement', newData) // Adjust the endpoint as necessary
        .then(() => navigate('/admin/home')) // Redirect to login or wherever you need
        .catch(error => console.error('Error registering:', error));
    }
    // Clear the form after registration
    setEmail('');
    setName('');
    setPassword('');
    setRole('');
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="register-section">
        <h3>Register Users / Mangement</h3>
        <form onSubmit={handleRegister}>
        
        <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Gmail"
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />

          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="management">Management</option>
          </select>

          <button type="submit">Register {role}</button>
        </form>
      </div>

      <div className="tickets-section">
        <h3>Tickets</h3>
        <ul>
          <li>
          <button onClick={() => navigate('/admin/getAllTickets')}>View Tickets Raised by Students</button>          </li>
          <li>
          <button onClick={() => navigate('/admin/getInProgressTickets')}>View Tickets That are In Progress</button>
          </li>
          <li>
            <button>View Solved Tickets</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminDashboard;
