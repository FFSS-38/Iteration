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

// login user :: path='http://localhost:3000/user/login'
router.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json(res.locals.userObj);
  }
);

//get all user pets :: path='http://localhost:3000/user/pets'
router.get(
  '/pets',
  sessionController.checkSession,
  petController.getUserPets, //return an array of pet names
  (req, res) => {
    return res.status(200).json(res.locals.allPets);
  }
);

//logout :: path='http://localhost:3000/user/logout'
router.get('/logout', userController.logOut, (req, res) => {
  return res.sendStatus(200);
});

//MISC
// check active session :: path='http://localhost:3000/user/checkSession'
router.post('/checkSession', sessionController.checkSession, (req, res) => {
  return res.sendStatus(200);
});

router.delete('/:userId', userController.deleteUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.get('/all', userController.getAllUsers, (req, res) => {
  return res.sendStatus(200);
});

router.get('/allSessions', sessionController.getAllSessions, (req, res) => {
  return res.sendStatus(200);
});
module.exports = router;
