const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const petController = require('../controllers/petController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const cors = require('cors');
router.use(cors({ origin: 'http://localhost:8080' }));

// createUser :: path='http://localhost:3000/user'
router.post(
  '/',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals.userObj);
  }
);

// login user, verify, set cookie :: path='http://localhost:3000/user/login'
router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals.userObj);
  }
);

//path='http://localhost:3000/user/pets'
router.get(
  '/pets',
  sessionController.checkSession,
  petController.getUserPets, //return an array of pet names
  (req, res) => {
    return res.status(200).json(res.locals.allPets);
  }
);

//path='http://localhost:3000/user/logout'
router.get('/logout', userController.logOut, (req, res) => {
  return res.sendStatus(200);
});
// used to check active session with cookie ssid :: path='http://localhost:3000/user/checkSession'
router.get('/checkSession', sessionController.checkSession, (req, res) => {
  return res.sendStatus(200);
});

router.delete('/:userId', userController.deleteUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.get('/all', userController.getAllUsers, (req, res) => {
  return res.sendStatus(200);
});

router.get('/allSessions');
module.exports = router;
