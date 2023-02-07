const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');
const petController = require('../controllers/petControllers');

const cors = require('cors');
router.use(cors({ origin: 'http://localhost:3001' }));
//createUser :: path='/
// http://localhost:3000/api/users/
//send the following request : { "Name":"Pierre", "Password":"Jacquemin"}
//response: {"Name":"Pierre","Password":"Jacquemin","Pets":[],"_id":"63e1213bcb9b9423d0ba43a7","__v":0}
router.post('/users', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

//getUser
// http://localhost:3000/api/Pierre
// response: [{"_id":"63e1213bcb9b9423d0ba43a7","Name":"Pierre","Password":"Jacquemin","Pets":[],"__v":0}]
router.get('/:users', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

//Wunderpets Notes::
// app.post('/signup', userController.createUser , (req, res) => {
//   // what should happen here on successful sign up?

// });

/**
 * login
 */
// app.post('/login', userController.verifyUser, (req, res) => {
//   // what should happen here on successful log in?

// });
