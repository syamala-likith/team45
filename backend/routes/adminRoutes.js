import express from 'express';
import { Admin } from '../models/adminModule.js';

const router = express.Router();

router.post('/addAdmin', async (req,res)=>{
    try{
      console.log("ytfdsasdfgh");
        if(!req.body.email || !req.body.pwd){
            return res.status(400).send({message:'Enter all required fields: email and password'});
        }

        const newAdmin = {
            email:req.body.email,
            pwd:req.body.pwd
        }

        const admin = await Admin.create(newAdmin);

        return res.status(201).send(admin);
    }
    catch(error){
        if(error.code==11000){
            console.error('Duplicate email detected');
            res.status(500).send({message:'Duplicate email detected'});
        }
        else{
            console.log(error);
            res.status(500).send({message:error.message});
        }
    }
});

router.post('/adminLogin', async (req, res) => {
    try {
      // console.log("ytfdsasdfgh");
      const email = req.body.email;
      // const pwd = req.query.pwd;
  
      const admin = await Admin.findOne({ email:email });
  
      if (!admin) {
        return res.status(400).send({ message: 'Invalid admin details', status: false });
      }
      // console.log("ytfdsasdfgh");
      // Replace `pwd` with the actual password field you are checking against
      if (admin.pwd !== req.body.pwd) {
        return res.status(400).send({ message: 'Invalid admin details', status: false });
      }
  
      return res.status(200).send({ message: 'Login Successful', status: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });
  

export default router;