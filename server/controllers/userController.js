const express = require('express');
const mongoose = require('mongoose');
const userController = {};
const { User, Pet, Session } = require('../models/models');

//FirstName, LastName, Email
userController.createUser = (req, res, next) => {
  console.log('in createuser controller: attempting to create');
  const { FirstName, LastName, Email, Password } = req.body;
  if (!FirstName || !LastName || !Email || !Password) {
    return next({
      log: 'Error in userController.createUser, invalid user inputs',
      message: 'Invalid inputs.',
    });
  }
  // FirstName, LastName, Email,
  User.create({ FirstName, LastName, Email, Password })
    .then((user) => {
      console.log('Created new user', user);
      res.locals.userObj = user;
      next();
    })
    .catch((err) => {
      console.log('err:', err);
      next({
        log: 'userController.createUser encountering error',
        message: { err: 'Could not create user' },
      });
    });
};

//upon login
//checks if User and password matches up in db
userController.verifyUser = (req, res, next) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return next({
      log: 'Error in userController.verifyUser, missing email or password inputs',
    });
  }
  //insert error handler here
  console.log('Trying to verify user with, ', Password);
  User.findOne({ Email })
    .then((user) => {
      console.log('Found user info to check pw', user);
      if (user.Password !== Password) {
        return next({
          log: 'Error in userController.verifyingUser, wrong password',
          status: 401,
          message: { err: 'Wrong Password. Try Again' },
        });
      } else {
        console.log('User Verified');
        res.locals.userObj = user;
        return next();
      }
    })
    .catch((err) => {
      next({
        log: 'userController.verifyUser failed',
        message: { err: 'Could not retrive user that you asked for' },
      });
    });
};

userController.deleteUser = (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        next({
          log: 'userController.deleteUser error: User not found',
          message: { err: 'User not found' },
        });
      }
      console.log('Deleted user', deletedUser);
      res.status(200).json({
        message: 'User successfully deleted',
        deletedUser,
      });
    })
    .catch((err) => {
      next({
        log: 'userController.deleteUser error: Could not delete user',
        message: { err: 'Could not delete user' },
      });
    });
};

userController.getAllUsers = (req, res, next) => {
  User.find({}).then((users) => {
    console.log(users);
    next();
  });

  // return res.send(users);
};

//clear cookie and session
userController.logOut = (req, res, next) => {
  console.log('Loggin out...');
  const { ssid } = req.cookies;
  if (!ssid) {
    return next({
      log: 'Error occurred in the sessionController.logOut middleware function',
      status: 400,
      err: { err: 'No cookie to delete' },
    });
  } else {
    res.clearCookie('ssid');
    console.log('SSID Cookie cleared');
  }
  Session.findOneAndDelete({ cookieId: ssid })
    .then((data) => {
      console.log('Session deleted.');
      return next();
    })
    .catch((err) => {
      return next({
        log: ' Error occured in session Controller.logout; unable to find session to delete',
      });
    });
};

module.exports = userController;
