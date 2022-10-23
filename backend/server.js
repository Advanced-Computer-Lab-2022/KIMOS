const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')


connectDB();
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: false}));

app.use('/users',require('./routes/userRoutes'))
app.use('/courses',require('./routes/courseRoutes'))

const port = process.env.PORT
app.listen(port,() => console.log(`Server started on port ${port}`));