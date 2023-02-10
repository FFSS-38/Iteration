const db = require('../models/models');
const express = require('express');

const cookieController = {};

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
