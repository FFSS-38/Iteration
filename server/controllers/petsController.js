const express = require('express');
const db = require('../database');
const mongoose = require('mongoose');
const { Users, Pets } = require('../database.js');

const petsController = {};

petsController.createUser = (req, res, next) => {
  Pets.create({ Name: req.body.name })
    .then((newPet) => {
      res.locals.newPet = newPet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.createUser encountered error',
        message: { err: 'Could not create pet' },
      });
    });
};

module.exports = petsController;
