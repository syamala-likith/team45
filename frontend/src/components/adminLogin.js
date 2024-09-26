import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  //    I can use this way also
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5555/admin/adminLogin/',
  //       { email:email, pwd: password }, // Send password as query parameter
  //     );

  //     if (response.data.status === true) {
  //       navigate('/admin/home');
  //     } else {
  //       alert(response.data.message);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       alert(error.response.data.message);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.error('Error', error.message);
  //     }
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
