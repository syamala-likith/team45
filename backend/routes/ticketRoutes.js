import express from 'express';
import { Ticket } from '../models/ticketsModule.js'; // Importing Ticket from ticketsModule

const router = express.Router();

router.post('/addTicket', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.userEmail || !req.body.description || !req.body.type) {
            return res.status(400).send({ message: 'Enter all required fields: User Email, Description, Type' });
        }

        // Create a new ticket
        const newTicket = {
            userEmail: req.body.userEmail,
            description: req.body.description,
            type: req.body.type,
            status:req.body.status
        };

        const ticket = await Ticket.create(newTicket);

        return res.status(201).send(ticket);
    } catch (error) {
        console.error('Error creating ticket:', error); // Log the error for debugging
        // Generic error handling
        return res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});

router.get('/getAllTickets', async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        return res.status(200).json({
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get('/getTicketsByStatus/in-progress', async (req, res) => {
    try {
        // Fix the typo from 'staus' to 'status'
        const tickets = await Ticket.find({ status: 'in-progress' });
        return res.status(200).json({
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get('/getTicketsByStatus/solved', async (req, res) => {
    try {
        // Fix the typo from 'staus' to 'status'
        const tickets = await Ticket.find({ status: 'solved' });
        return res.status(200).json({
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});


router.get('/getTicketsByEmail/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const tickets = await Ticket.find({ userEmail: email });

        if (!tickets) {
            return res.status(404).send({ message: 'Tickets Not Found' });
        }

        return res.status(200).send(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.put('/updateTicketToInProgressById/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { managementEmail } = req.body; // Get managementEmail from request body
  
      const result = await Ticket.findByIdAndUpdate(
        id,
        { status: 'in-progress', managementEmail }, // Update both status and managementEmail
        { new: true } // Return the updated document
      );
  
      if (!result) {
        return res.status(404).json({ message: 'Ticket Not Found' });
      }
  
      return res.status(200).send({ message: 'Ticket Updated Successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });
  


router.put('/updateTicketToDoneById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Update the status to 'Done'
        const result = await Ticket.findByIdAndUpdate(id, { status: 'solved' }, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Ticket Not Found' });
        }

        return res.status(200).send({ message: 'Ticket Marked as Done', updatedTicket: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});



export default router;
