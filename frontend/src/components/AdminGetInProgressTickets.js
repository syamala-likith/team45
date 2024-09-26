// InProgressTickets.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InProgressTickets = () => {
  const [inProgressTickets, setInProgressTickets] = useState([]);

  useEffect(() => {
    const fetchInProgressTickets = async () => {
      try {
        // Fetch all tickets with the "in-progress" status
        const response = await axios.get(`http://localhost:4545/ticket/getTicketsByStatus/in-progress`);
        
        // Assuming the response format is similar
        if (response.data && Array.isArray(response.data.data)) {
          setInProgressTickets(response.data.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching in-progress tickets:', error);
      }
    };

    fetchInProgressTickets();
  }, []);

  return (
    <div>
      <h1>In-Progress Tickets</h1>
      {inProgressTickets.length > 0 ? (
        inProgressTickets.map(ticket => (
          <div key={ticket._id}>
            <span>{ticket.description} (Type: {ticket.type}) - Status: {ticket.status}</span>
          </div>
        ))
      ) : (
        <p>No in-progress tickets available.</p>
      )}
    </div>
  );
};

export default InProgressTickets;
