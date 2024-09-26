// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email)
    const newUser = { email, pwd };
    axios.post('http://localhost:4545/admin/addAdmin', newUser) // Adjust the endpoint as necessary
      .then(() => navigate('/')) // Redirect to login or wherever you need
      .catch(error => console.error('Error registering:', error));
  };

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" name='pwd' value={pwd} onChange={(e) => setPwd(e.target.value)} required />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
    );

  }

export default Register;
