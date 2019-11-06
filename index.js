const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// Modules
const passportConfig = require('./config/passport');

// INITIALIZING PASSPORT CONFIG
passportConfig(passport);

const api = require('./express/api');
//  Express App initalizing
const app = express();

//  Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//  API
app.use('/api', api);

// Global error handler
process.on('unhandledRejection', ex => {
  throw ex;
});

const port = process.env.PORT || 5001;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
app.use(function(error, req, res, next) {
  res.status(error.status || 500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
