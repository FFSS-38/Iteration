const { User, Pet, Session } = require('../models/models');
const { ObjectId } = require('mongodb');
const express = require('express');

const sessionController = {};

sessionController.startSession = (req, res, next) => {
  console.log('Starting Session');
  let cookieId = res.locals.userObj._id;
  if (!cookieId) {
    return next({
      log: 'Error in sessionController.startSession, unable to retrieve _id from res.locals.userObj',
    });
  }
  Session.create({ cookieId })
    .then((data) => {
      console.log('Successfully created session', data);
      next();
    })
    .catch((err) => {
      next({
        log: 'Error occurred in the sessionController.startSession middleware',
        status: 400,
        err: { err: 'Error occurred in creating your session' },
      });
    });
};

//matches cookie with session for active session
sessionController.checkSession = (req, res, next) => {
  console.log('in check session');
  //get cookie and find in db
  const { ssid } = req.cookies;
  console.log('ssid/cookieid', ssid);
  if (!ssid) {
    return next({
      log: 'Error occurred in the sessionController.checkSession',
      status: 400,
      err: { err: 'No cookie found' },
    });
  }
  Session.findOne({ cookieId: ssid })
    .exec()
    .then((data) => {
      if (!data) {
        return next({
          log: 'Error occured in checkSession; session returned null',
          status: 400,
          err: { err: 'No session found' },
        });
      }
      console.log('session exists', data);
      res.locals.cookie = data.cookieId
      return next();
    })
    .catch((err) => {
      next({
        log: 'Error occured in checkSession; unable to find session',
        status: 400,
        err: { err: 'No session found' },
      });
    });
};

sessionController.getAllSessions = (req, res, next) => {
  Session.find({}).then((sessions) => {
    console.log('All session', sessions);
    next();
  });
};
module.exports = sessionController;
