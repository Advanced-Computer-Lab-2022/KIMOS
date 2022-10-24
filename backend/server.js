const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')
const cors=require('cors');


connectDB();
const app = express();
app.use(cors());
connectDB();






app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: false}));

app.use('/', require('./routes/allRoutes'));
app.use('/users',require('./routes/userRoutes'))
app.use('/courses',require('./routes/courseRoutes'))

const port = 3000
app.listen(port,() => console.log(`Server started on port ${port}`));