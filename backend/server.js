import express from "express";
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
import managementRoutes from './routes/managementRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'


const app = express();
app.use(cors());
app.use(express.json());


app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
app.use('/management',managementRoutes);
app.use('/ticket',ticketRoutes);

    
mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("App Connected to the database");
        app.listen(PORT,()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });

