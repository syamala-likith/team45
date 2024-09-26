// AllTickets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:4545/ticket/getAllTickets`);
        // Assuming the response format is the same as before
        if (response.data && Array.isArray(response.data.data)) {
          setTickets(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching all tickets:', error);
      }
    };

    fetchAllTickets();
  }, []);

  return (
    <div>
      <h1>All Tickets Raised by Students</h1>
      {tickets.length > 0 ? (
        tickets.map(ticket => (
          <div key={ticket._id}>
            <span>{ticket.description} (Type: {ticket.type}) - Status: {ticket.status}</span>
          </div>
        ))
      ) : (
        <p>No tickets available.</p>
      )}
    </div>
  );
};

export default AllTickets;
