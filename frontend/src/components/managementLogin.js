// src/components/UserLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const ManagementLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleUserLogin = (e) => {
    e.preventDefault();

    // Check if the entered credentials match any registered user
    axios.post('http://localhost:4545/management/managementLogin', {
        email: email,
        pwd: password
      })
      .then((response) => {
        if (response.data.status === true) {
          Cookies.set('isLogedIn', 'true', { expires: 1 });
          Cookies.set('memail', email);
          navigate('/management/home');
        } else {
          Cookies.remove('isLogedIn');
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <div className="user-login-container">
      <h2>Management Login</h2>
      <form onSubmit={handleUserLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default ManagementLogin;
