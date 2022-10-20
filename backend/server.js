const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db')

connectDB();
const app = express();

const port = process.env.PORT
app.listen(port,() => console.log(`Server started on port ${port}`));