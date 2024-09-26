import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './userHome.css';

function UserHome() {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Technical');
  const [ticketHistory, setTicketHistory] = useState([]); // State to store tickets
  const navigate = useNavigate();

  // Fetch all tickets by user email when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userEmail = Cookies.get('uemail');
        const response = await axios.get(`http://localhost:4545/ticket/getTicketsByEmail/${userEmail}`);
        setTicketHistory(response.data); // Assuming the API returns an array of tickets
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets(); // Call the function to fetch tickets on component mount
  }, []);

  const handleTicketSubmit = (e) => {
    e.preventDefault();

    if (!description || !type) {
      return;
    }

    const newData = {
      userEmail: Cookies.get('uemail'),
      description: description,
      status: 'pending',
      type: type
    };

    axios.post('http://localhost:4545/ticket/addTicket', newData)
      .then(() => {
        // After submission, refetch tickets to update the history
        setTicketHistory([...ticketHistory, newData]);
        navigate('/user/home');
      })
      .catch(error => console.error('Error adding:', error));

    setDescription('');
    setType('');
  };

  function getStatusClass(a){
    return a;
  }

  return (
    <div className='student-dashboard'>
      <h2>User Dashboard</h2>
      <form onSubmit={handleTicketSubmit} className="ticket-form">
        <label>
          Description:
          <textarea
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue"
            className="ticket-textarea"
          />
        </label>
        <br />
        <label>
          Type:
          <select value={type} name="type" onChange={(e) => setType(e.target.value)} className='category-select'>
            <option value="Technical">Technical</option>
            <option value="Academic">Academic</option>
            <option value="Administrative">Administrative</option>
          </select>
        </label>
        <br />
        <button type="submit" className='submit-button'>Submit Ticket</button>
      </form>

      <h3>Request History</h3>

      {ticketHistory.length === 0 ? (
        <p>No tickets raised yet.</p>
      ) : (
        <ul className='ticket-list'>
          {ticketHistory.map((ticket, index) => (
            <li key={index} className='ticket-item'>
              <strong>Description:</strong> {ticket.description} <br />
              <strong>Type:</strong> {ticket.type} <br />
              <strong>Status:</strong> <span className={getStatusClass(ticket.status)}>{ticket.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserHome;
