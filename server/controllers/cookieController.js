const db = require('../models/models');
const express = require('express');

// const { User, Pet } = require('../models/models');

const cookieController = {};

//res.locals.userObj starts as the obj returned after creating a new user or logging in.
//the _id is taken and stringified to be stored as a browser cookie;
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('setCook - res.locals:', res.locals.userObj);
  const databaseId = res.locals.userObj._id.toString();
  if (!databaseId) {
    return next({
      log: 'Err in cookieController.setSSIDCookie, no ssid found',
    });
  }
  res.cookie('ssid', databaseId, { httpOnly: true });
  return next();
};

module.exports = cookieController;
