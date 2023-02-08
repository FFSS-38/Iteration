const db = require('../models/models');
const express = require('express');
const mongoose = require('mongoose');

const { User, Pet } = require('../models/models');

const cookieController = {};
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('setCook - res.locals:', res.locals.userObj);
  const databaseId = res.locals.userObj._id.toString();
  res.cookie('ssid', databaseId, { httpOnly: true });
  return next();
};

module.exports = cookieController;
