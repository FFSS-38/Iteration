const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const petRouter = require('./routes/petRouter');
const userRouter = require('./routes/userRouter');
const { User, Pet } = require('./models/models');

const mongoURI =
  'mongodb+srv://ffssiteration:ffssiteration@cluster0.zvua8pg.mongodb.net/myFirstDatabase?appName=mongosh+1.6.2';
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const PORT = 3000;
const app = express();

// const mongoURI =
//   process.env.NODE_ENV === 'test'
//     ? 'mongodb://localhost/unit11test'
//     : 'mongodb://localhost/unit11dev';
// mongoose.connect(mongoURI);

/**
 * Automatically parse urlencoded body content and form data from incoming requests and place it
 */
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/client', express.static(path.resolve(__dirname, '../client')));

/**
 * --- Express Routes ---
 * Express will attempt to match these routes in the order they are declared here.
 * If a route handler / middleware handles a request and sends a response without
 * calling `next()`, then none of the route handlers after that route will run!
 * This can be very useful for adding authorization to certain routes...
 */

/**
 * root
 */
app.get('/', (req, res) => {
  //console.log('working');
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/pet', petRouter);
app.use('/user', userRouter);

/**
 * signup
 * signup.html does not exist atm, translate into new componenet? -RK
 */
app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

// /**
// * Authorized routes
// */
// app.get('/secret', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/secret.html'));
// });

// app.get('/secret/users', userController.getAllUsers, (req, res) => {
//   res.send( { users: res.locals.users });
// })

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
