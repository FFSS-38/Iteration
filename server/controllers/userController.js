const db = require('../database');
const express = require('express');
const mongoose = require('mongoose');
const userController = {};
const { Users, Pets } = require('../database.js');

userController.createUser = (req, res, next) => {
  console.log(req.body);
  Users.create({ Name: req.body.Name, Password: req.body.Password })
    .then((user) => {
      res.locals.user = user;
      return next();
    })
    .catch((err) => {
      next({
        log: 'userController.createUser encountering error',
        message: { err: 'Could not create user' },
      });
    });
};

userController.getUser = (req, res, next) => {
  Users.find({ Name: req.params.users })
    .then((user) => {
      if (!user) {
        return next({
          log: 'userController.getUser tried to find user that doesnt exist',
          message: { err: 'That name is not in the database' },
        });
      }
      res.locals.user = user;
      return next();
    })
    .catch((err) => {
      next({
        log: 'userController.getUser failed',
        message: { err: 'Could not retrive user that you asked for' },
      });
    });
};
module.exports = userController;
