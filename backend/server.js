const express = require('express');
const dotenv = require('dotenv').config();
<<<<<<< Updated upstream

const connectDB = require('./config/db')
const cors=require('cors');
=======
const connectDB = require('./config/db');
const cors = require('cors');
>>>>>>> Stashed changes



connectDB();
const app = express();
app.use(cors());
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use('/users', require('./routes/userRoutes'));
app.use('/courses', require('./routes/courseRoutes'));
<<<<<<< Updated upstream
app.use('/', require('./routes/allRoutes'));
=======
>>>>>>> Stashed changes

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
