const express = require('express');
const Users = require('../database.js');
const starWarsController = require('../controllers/Controller');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/testroute', (req, res) => {
  console.log('hello from lol');
  Users.find({})
    .then((userlist) => {
      // console.log("hi from first chain")
      res.send(userlist), console.log('hello from 9999');
    })
    .catch((err) => {
      next({
        log: 'ERROR ERROR',
        message: { err: err },
      });
    });
});

module.exports = router;
