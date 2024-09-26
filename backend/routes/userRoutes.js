import express from 'express';
import { User } from '../models/userModel.js'; // Importing User from userModel

const router = express.Router();

router.post('/addUser', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).send({ message: 'Enter all required fields: name, age, email, and password' });
        }

        // Create a new user
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            pwd: req.body.password
        };

        const user = await User.create(newUser);

        return res.status(201).send(user);
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

router.post('/userLogin', async (req, res) => {
    try {
      // console.log("ytfdsasdfgh");
      const email = req.body.email;
      // const pwd = req.query.pwd;
  
      const user = await User.findOne({ email:email });
  
      if (!user) {
        return res.status(400).send({ message: 'Invalid admin details', status: false });
      }
      // console.log("ytfdsasdfgh");
      // Replace `pwd` with the actual password field you are checking against
      if (user.pwd !== req.body.pwd) {
        return res.status(400).send({ message: 'Invalid admin details', status: false });
      }
  
      return res.status(200).send({ message: 'Login Successful', status: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get('/getUserById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({ message: 'User Not Found' });
        }

        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.get('/getUserByEmail/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ message: 'User Not Found' });
        }

        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.put('/updateUserById/:id', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name || !req.body.age || !req.body.email || !req.body.pwd) {
            return res.status(400).send({ message: 'Enter all required fields: name, age, email, and password' });
        }

        const { id } = req.params;

        const result = await User.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        return res.status(200).send({ message: 'User Details Updated Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.put('/updateUserByEmail/:email', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name || !req.body.age || !req.body.email || !req.body.pwd) {
            return res.status(400).send({ message: 'Enter all required fields: name, age, email, and password' });
        }

        const { email } = req.params;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        user.name = req.body.name;
        user.age = req.body.age;
        user.email = req.body.email;
        user.pwd = req.body.pwd;

        await user.save();

        return res.status(200).send({ message: 'User Details Updated Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/deleteUserById/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({ message: 'User Not Found' });
        }

        return res.status(200).send({ message: 'User Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

router.delete('/deleteUserByEmail/:email', async (req, res) => {
    try {
        const { email } = req.params;

        const result = await User.deleteOne({ email: email });

        if (!result) {
            return res.status(404).send({ message: 'User Not Found' });
        }

        return res.status(200).send({ message: 'User Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;
