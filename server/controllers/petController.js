const express = require('express');
const db = require('../database');
const mongoose = require('mongoose');
const { Users, Pets } = require('../database.js');

const petsController = {};

petsController.createPet = (req, res, next) => {
  Pets.create({
    Name: req.body.Name,
    Age: req.body.Age,
    Weight: req.body.Weight,
    Breed: req.body.Breed,
    LastVisit: req.body.LastVisit,
    AssignedVet: req.body.AssignedVet,
    Owner: req.body.Owner,
  })
    .then((pet) => {
      res.locals.newPet = pet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.createPet encountering error',
        message: { err: 'Could not create pet' },
      });
    });
};

//get Pet by params or Owner??
petsController.getPet = (req, res, next) => {
  Pets.find({ Name: req.params.pets })
    .then((pet) => {
      if (!pet) {
        return next({
          log: 'petsController.getPet encountered error',
          message: { err: 'That pet is not in the database' },
        });
      }
      res.locals.pet = pet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.getPet failed',
        message: { err: 'Could not retrive pet that you asked for' },
      });
    });
};

petsController.deletePet = (req, res, next) => {
  Pets.findOneAndDelete({ Name: req.params.pets })
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

petsController.updatePet = (req, res, next) => {
  Pets.findOneAndUpdate(
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

//returns pets for specific user
//WN: get Pet by params or Owner??
petsController.getPetUltimate = (req, res, next) => {
  Pets.find({ Owner: res.locals.user._id })
    .then((pets) => {
      if (!pets) {
        return next({
          log: 'petsController.getPetUltimate encountered error',
          message: {
            err: 'Those pets are  not in the database with said ownerID',
          },
        });
      }
      res.locals.returnedPets = pets;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.getPetUltimate failed',
        message: { err: 'Could not retrive pets that you asked for' },
      });
    });
};

module.exports = petsController;
