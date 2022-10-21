const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors=require('cors');
const instructorRoutes= require('./routes/instructorRoutes.js');

const app = express();
app.use(cors());
connectDB();

app.use('/Instructor',instructorRoutes);

const port = process.env.PORT;
app.listen(port,() => console.log(`Server started on port ${port}`));