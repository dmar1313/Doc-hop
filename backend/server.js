const cors = require('cors');
const driversRouter = require('./api/drivers');
const vehiclesRouter = require('./api/vehicles');
const usersRouter = require('./api/users');
const tripsRouter = require('./api/trips'); 
const express = require('express');
const router = require('./api/router');

const app = express();  

app.use(cors({
  origin: '*' 
}));  
app.use('/api/drivers', driversRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use((req, res, next) => {
  console.log('Middleware function called!');
  next();
  console.error();
  res.status(500).send('Internal Server Error');
});
  // Middleware
  app.use(cors({
    origin: 'http://localhost:3000'
  }));// Enable CORS for all routes
  app.use(express.json()); // Parse JSON bodies

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });