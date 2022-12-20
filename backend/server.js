const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const cors = require('cors');
const { errorHandler } = require('./middleware/error');

const app = express();
app.use(cors());
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use('/', require('./routes/verificationRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/courses', require('./routes/courseRoutes'));
app.use('/contracts', require('./routes/contractRoutes'));
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
