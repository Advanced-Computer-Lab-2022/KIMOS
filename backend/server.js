const express = require('express');
const dotenv = require('dotenv').config();

const connectDB = require('./config/db');
const cors = require('cors');
const { errorHandler } = require('./middleware/error');
const { loggedIn } = require('./middleware/auth');

const app = express();
app.use(cors());
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(errorHandler);

app.use('/users', require('./routes/userRoutes'));
app.use('/courses', require('./routes/courseRoutes'));
app.use('/contracts', require('./routes/contractRoutes'));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
