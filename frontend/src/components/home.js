// src/components/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './home.css'; // Import the CSS
import backgroundImage from './images/image.png'; // Make sure this path is correct

const Home = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Admin credentials
    axios.post('http://localhost:4545/admin/adminLogin', {
      email: email,
      pwd: password
    })
    .then((response) => {
      if (response.data.status === true) {
        Cookies.set('isLogedIn', 'true', { expires: 1 });
        navigate('/admin/home');
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

  const handleStudentLogin = () => {
    // Logic for student login (you can add actual logic here)
    navigate('/user/login'); // Redirect to student dashboard (assuming you have it)
  };

  const handleManagementLogin = () => {
    // Logic for management login (you can add actual logic here)
    navigate('/management/login'); // Redirect to management dashboard (assuming you have it)
  };
  

  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Ticket Rising title at the top */}
      <div className="title-container">
        <h1 className="title">Ticket Rising</h1>
      </div>

      {/* Login form positioned on the right side */}
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
        
        {/* Separate buttons for Student and Management Login */}
        <div className="alternate-login">
          <button onClick={handleStudentLogin} className="alternate-button">Student Login</button>
          <button onClick={handleManagementLogin} className="alternate-button">Management Login</button>
        </div>
      </div>
    </div>
  );
};

export default Home;