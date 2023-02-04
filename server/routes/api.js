const express = require('express');
const { Users, Pets } = require('../database.js');
const starWarsController = require('../controllers/Controller');
const mongoose = require('mongoose');
const router = express.Router();

// router.get('/testroute', (req, res) => {
//   console.log('hello from lol');
//   Users.find({})
//     .then((userlist) => {
//       console.log('hello from 9999');
//       return res.status(200).json(userlist);
//     })
//     .catch((err) => {
//       console.log('ERROR ERROR', err);
//       return res.status(500).json({
//         message: 'An error occurred while processing the request',
//         error: err
//       });
//     });
// });

// router.get('/testroute', (req, res) => {
//   console.log('hello from lol');
//   Users.find({})
//     .then((userlist) => {
//       // console.log("hi from first chain")
//       console.log('hello from 9999');
//       return res.status(200).json(userlist);
//     })
//     .catch((err) => {
//       next({
//         log: 'ERROR ERROR',
//         message: { err: err },
//       });
//     });
// });

router.post('/testroute', (req, res) => {
  Users.create({ Name: 'CREATE2', Password: '1234' })
    .then((userlist) => {
      console.log('hello from 9999');
      console.log(userlist);
      return res.status(200).json(userlist);
    })
    .catch((err) => {
      console.log('ERROR ERROR', err);
      return res.status(500).json({
        message: 'An error occurred while processing the request',
        error: err,
      });
    });
});

router.get('/testroute', (req, res) => {
  console.log('hello from lol');
  console.log(Users);
  Users.find({})
    .then((userlist) => {
      console.log('hello from 9999');
      console.log(userlist);
      return res.status(200).json(userlist);
    })
    .catch((err) => {
      console.log('ERROR ERROR', err);
      return res.status(500).json({
        message: 'An error occurred while processing the request',
        error: err,
      });
    });
});

module.exports = router;
