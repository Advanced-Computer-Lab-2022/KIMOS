const express = require('express');
const dotenv = require('dotenv').config();
<<<<<<< HEAD
const connectDB = require('./config/db');
const cors=require('cors');
const instructorRoutes= require('./routes/instructorRoutes.js');
=======

const connectDB = require('./config/db')
const cors=require('cors');


>>>>>>> 1stMerge

const app = express();
app.use(cors());
connectDB();

<<<<<<< HEAD
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: false}));

app.use('/Instructor',instructorRoutes);

const port = process.env.PORT;
app.listen(port,() => console.log(`Server started on port ${port}`));
=======





app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));


app.use('/users', require('./routes/userRoutes'));
app.use('/courses', require('./routes/courseRoutes'));
app.use('/', require('./routes/allRoutes'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
>>>>>>> 1stMerge
