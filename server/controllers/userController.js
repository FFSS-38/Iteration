const db = require('../database');
const express = require('express');
const mongoose = require('mongoose');
const userController = {};
const { Users, Pets } = require('../database.js');

userController.createUser = (req, res, next) => {
  Users.create({ Name: 'CREATE2', Password: '1234' })
    .then((userlist) => {
      console.log('hello from 9999');
      console.log(userlist);
      res.locals.userlist = userlist;
      return next();
    })
    .catch((err) => {
      console.log('ERROR ERROR', err);
      return res.status(500).json({
        message: 'An error occurred while processing the request',
        error: err,
      });
    });
};

userController.getUser = (req, res, next) => {
  console.log('hello from lol');
  console.log(Users);
  Users.find({})
    .then((userlist) => {
      console.log('hello from 9999');
      console.log(userlist);
      res.locals.userlist = userlist;
      return next();
    })
    .catch((err) => {
      console.log('ERROR ERROR', err);
      return res.status(500).json({
        message: 'An error occurred while processing the request',
        error: err,
      });
    });
};
module.exports = userController;
