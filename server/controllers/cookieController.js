const db = require('../models/models');
const express = require('express');
const mongoose = require('mongoose');

const { User, Pet } = require('../models/models');

const cookieController = {};
cookieController.setSSIDCookie = (req, res, next) => {
  const databaseId = res.locals.userid;
  res.cookie('ssid', databaseId, { httpOnly: true });
  return next();
};

module.exports = cookieController;
