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

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/pet', petRouter);
app.use('/user', userRouter);

app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

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
