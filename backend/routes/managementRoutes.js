import express from 'express';
import { Management } from '../models/managementModule.js'; // Importing User from userModel

const router = express.Router();

router.post('/addManagement', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).send({ message: 'Enter all required fields: name, age, email, and password' });
        }

        // Create a new user
        const newManagement = {
            name: req.body.name,
            email: req.body.email,
            pwd: req.body.password
        };

        const management = await Management.create(newManagement);

        return res.status(201).send(management);
    } catch (error) {
        if (error.code == 11000) {
            console.error('Duplicate email detected');
            res.status(500).send({ message: 'Duplicate email detected' });
        } else {
            console.log(error);
            res.status(500).send({ message: error.message });
        }
    }
});


router.post('/managementLogin', async (req, res) => {
    try {
      // console.log("ytfdsasdfgh");
      const email = req.body.email;
      // const pwd = req.query.pwd;
  
      const management = await Management.findOne({ email:email });
  
      if (!management) {
        return res.status(400).send({ message: 'Invalid admin details', status: false });
      }
      // console.log("ytfdsasdfgh");
      // Replace `pwd` with the actual password field you are checking against
      if (management.pwd !== req.body.pwd) {
        return res.status(400).send({ message: 'Invalid admin details', status: false });
      }
  
      return res.status(200).send({ message: 'Login Successful', status: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });


export default router;
