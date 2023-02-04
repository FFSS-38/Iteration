const express = require('express');
const { Users, Pets } = require('../database.js');
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const petsController = require('../controllers/petsController');
const router = express.Router();

router.post('/users', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.userlist);
});

router.get('/users', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.userlist);
});

router.post('/pets', petsController.createUser, (req, res) => {
  res.status(200).json(res.locals.newPet);
});

module.exports = router;
