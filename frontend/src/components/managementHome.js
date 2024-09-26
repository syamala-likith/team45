import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './managementHome.css';

const ManagementHome = () => {
  const [requests, setRequests] = useState([]);         // To store pending tickets
  const [ongoingRequests, setOngoingRequests] = useState([]); // To store in-progress tickets
  const [solvedRequests, setSolvedRequests] = useState([]); // To store solved tickets

  // Fetch all tickets on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Fetch all pending tickets (no email filter)
        const pendingResponse = await axios.get(`http://localhost:4545/ticket/getAllTickets`);
        console.log('Pending Tickets Response:', pendingResponse.data); // Log the response
  
        // Check if the response contains data
        if (pendingResponse.data && Array.isArray(pendingResponse.data.data)) {
          const pendingTickets = pendingResponse.data.data.filter(ticket => ticket.status === 'pending');
          setRequests(pendingTickets);
        } else {
          console.error('Unexpected response format for pending tickets:', pendingResponse.data);
          setRequests([]); // Reset state if the format is not as expected
        }
  
        // Fetch tickets by management email for in-progress and solved statuses
        const managementEmail = Cookies.get('memail');
        const emailResponse = await axios.get(`http://localhost:4545/ticket/getTicketsByEmail/${managementEmail}`);
        
        // Filter tickets based on status from email response
        const inProgressTickets = emailResponse.data.filter(ticket => ticket.status === 'in-progress');
        const solvedTickets = emailResponse.data.filter(ticket => ticket.status === 'solved');
  
        // Set the state for each category of tickets
        setOngoingRequests(inProgressTickets);
        setSolvedRequests(solvedTickets);
        
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
  
    fetchTickets();
  }, []);
  
  

  // Function to process a request (Update status to "In Progress")
  // Function to process a request (Update status to "In Progress")
const processRequest = async (id) => {
  try {
    const managementEmail = Cookies.get('memail'); // Get management email from cookies
    const response = await axios.put(`http://localhost:4545/ticket/updateTicketToInProgressById/${id}`, {
      managementEmail // Send managementEmail in the request body
    });

    if (response.status === 200) {
      const requestToProcess = requests.find(req => req._id === id);
      setOngoingRequests([...ongoingRequests, { ...requestToProcess, status: 'in-progress', managementEmail }]);
      setRequests(requests.filter(req => req._id !== id));
    }
  } catch (error) {
    console.error('Error updating ticket:', error);
  }
};


  // Function to mark an ongoing request as done (Update status to "Done")
  const markAsDone = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4545/ticket/updateTicketToDoneById/${id}`);

      if (response.status === 200) {
        const requestToMark = ongoingRequests.find(req => req._id === id);
        setSolvedRequests([...solvedRequests, { ...requestToMark, status: 'solved' }]);
        setOngoingRequests(ongoingRequests.filter(req => req._id !== id));
      }
    } catch (error) {
      console.error('Error marking ticket as done:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Management Dashboard</h1>

      {/* Requests Raised by Students */}
      <div className="section">
        <h2>Requests Raised by Students</h2>
        {requests.length > 0 ? (
          requests.map(req => (
            <div key={req._id} className="request">
              <span>{req.description} (Type: {req.type}) - Status: {req.status}</span>
              <button onClick={() => processRequest(req._id)}>Process</button>
            </div>
          ))
        ) : (
          <p>No requests available.</p>
        )}
      </div>

      {/* Ongoing Requests */}
      <div className="section">
        <h2>Ongoing Requests</h2>
        {ongoingRequests.length > 0 ? (
          ongoingRequests.map(req => (
            <div key={req._id} className="request">
              <span>{req.description} (Type: {req.type}) - Status: {req.status}</span>
              <button onClick={() => markAsDone(req._id)}>Done</button>
            </div>
          ))
        ) : (
          <p>No ongoing requests.</p>
        )}
      </div>

      {/* Solved Requests */}
      <div className="section">
        <h2>Solved Requests</h2>
        {solvedRequests.length > 0 ? (
          solvedRequests.map(req => (
            <div key={req._id} className="request">
              <span>{req.description} (Type: {req.type}) - Status: {req.status}</span>
            </div>
          ))
        ) : (
          <p>No solved requests.</p>
        )}
      </div>
    </div>
  );
};

export default ManagementHome;
