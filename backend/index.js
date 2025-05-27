const express = require('express');

const port = process.env.PORT || 3000;


const app = express();
const homeRoute = require('./routes/home');

const userRoutes = require('./routes/user');
const boardRoutes = require('./routes/board');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const cors = require('cors');


app.use(cors({
  origin: '*', // Allow all origins for development; adjust as needed for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static('views'));
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
