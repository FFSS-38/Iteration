const express = require('express');
const db = require('../models/models');
const mongoose = require('mongoose');
const { User, Pet } = require('../models/models.js');
const { ObjectId } = require('mongodb');

const petController = {};
//front end wants to return pet object
petController.createPet = (req, res, next) => {
  Pet.create({
    Name: req.body.Name,
    Age: req.body.Age,
    Weight: req.body.Weight,
    Breed: req.body.Breed,
    LastVisit: req.body.LastVisit,
    AssignedVet: req.body.AssignedVet,
    Owner: req.body.OwnerId, //is the _id of UserObj, can betakeben from cookie, does not need to be user input
  })
    .then((pet) => {
      res.locals.petObj = pet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.createPet encountering error',
        message: { err: 'Could not create pet' },
      });
    });
};

//get all pets using cookie as user identifier
petController.getUserPets = (req, res, next) => {
  console.log('attempting to retrieve all your pets...');
  const { ssid } = req.cookies;
  if (!ssid) {
    return next({
      log: 'Error in petController.getUserPets, when retrieving ssid',
      status: 400,
      message: { err: 'Error when retrieving pets.' },
    });
  }
  Pet.find({ Owner: ssid })
    .then((data) => {
      console.log('pets collected, ', data);
      res.locals.allPets = data; //array of documents
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.getPet failed',
        message: { err: 'Could not retrive pet that you asked for' },
      });
    });
};

petController.deletePet = (req, res, next) => {
  Pet.findOneAndDelete({ Name: req.params.pets })
    .then((pet) => {
      if (!pet) {
        return next({
          log: 'petsController.delete could not find pet to delete',
          message: { err: 'Could not delete pet' },
        });
      }
      res.locals.deletedPet = pet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.deletePet failed',
        message: { err: 'Could not delete pet' },
      });
    });
};

petController.updatePet = (req, res, next) => {
  Pet.findOneAndUpdate(
    { Name: req.params.pets },
    {
      Name: req.body.Name,
      Age: req.body.Age,
      Weight: req.body.Weight,
      Breed: req.body.Breed,
      LastVisit: req.body.LastVisit,
      AssignedVet: req.body.AssignedVet,
    },
    //returns the new updated pet
    { new: true }
  )
    .then((pet) => {
      if (!pet) {
        return next({
          log: 'pets.controller updatepets could not update pet',
          message: {
            err: 'Could not update pet, please look into input/params',
          },
        });
      }
      res.locals.updatedPet = pet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.updatePet failed',
        message: { err: 'Could not update pet' },
      });
    });
};

module.exports = petController;
