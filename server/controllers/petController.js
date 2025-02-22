const express = require('express');
const db = require('../models/models');
const { User, Pet, Visit, Note } = require('../models/models.js');
const { ObjectId } = require('mongodb');
const { notStrictEqual } = require('assert');
const mongoose = require('mongoose');

const petController = {};

//returns petObj
petController.createPet = (req, res, next) => {
  console.log('Trying to create pet.....');
  const { Name, Age, Weight, Breed, AssignedVet, URL } = req.body;
  const { ssid } = req.cookies;
  if (!Name || !ssid) {
    return next({
      log: 'Error in petController.createPet, missing Name input or SSID',
      status: 400,
      message: 'Missing input.',
    });
  }
  Pet.create({
    Name,
    Age,
    Weight,
    Breed,
    URL,
    AssignedVet,
    Owner: ssid, //is the _id of UserObj, can betakeben from cookie, does not need to be user input
  })
    .then((pet) => {
      console.log('pet created!');
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

//delete pet but taking in Pet._id
petController.deletePet = (req, res, next) => {
  console.log('trying to delete pet');
  const { _id } = req.body;
  if (!_id) {
    return next({
      log: 'Err in petController.deletePet, when acquiring _id',
      status: 418,
      message: {
        err: 'Could choose pet to delete.',
      },
    });
  }
  Pet.findOneAndDelete({ _id })
    .then((pet) => {
      consople.log('pet deleted. GOOD BYE', pet);
      res.locals.deletedPet = pet;
      return next();
    })
    .catch((err) => {
      next({
        log: 'petsController.deletePet failed',
        message: { err: 'Could not find and delete pet' },
      });
    });
};

petController.updatePet = (req, res, next) => {
  console.log('Trying to update the pet');
  const { _id, Name, Age, Weight, Breed, URL, AssignedVet } = req.body;
  //for testing purposes
  // const s_id = _id.toString();
  console.log('req.body:', req.body);
  //go to next middleware to check if anything was added for visits
  if (!Name || !Age || !Weight || !Breed || !AssignedVet || !URL) {
    return next();
  }
  Pet.findOneAndUpdate(
    { _id },
    { $set: { Name, Age, Weight, Breed, URL, AssignedVet } },
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
      } else {
        res.locals.updatedPet = pet;
        console.log('pet info updated', pet);
        res.locals.updatePet = pet;
        return next();
      }
    })
    .catch((err) => {
      next({
        log: 'petsController.updatePet failed',
        message: { err: 'Could not update pet' },
      });
    });
};

petController.getVisits = (req, res, next) => {
  const { Pet } = req.body;
  if (!Pet)
    return next({
      log: 'Error in getVisits, no Pet id ',
    });
  Visit.find({ Pet })
    .then((visits) => {
      console.log('got pets visits');
      res.locals.allVisits = visits;
      return next();
    })
    .catch((err) => {
      log: 'Error when retrieving all visits';
    });
};

petController.updateVisits = (req, res, next) => {
  const { _id, LastVisit } = req.body;
  console.log('processing request to update visits with', _id, LastVisit.Date);
  if (!LastVisit || !LastVisit.Date) {
    console.log('No visits, so visits were not updated');
    return next();
  }

  const date = new Date(LastVisit.Date);
  const dateParsed = date.toDateString();
  console.log('dateparse:', dateParsed);
  if (isNaN(date)) {
    console.log('Invalid date. Please use the YYYY-MM-DD format');
    return next();
  }
  let newVet = res.locals.updatedPet.AssignedVet;
  if (LastVisit.Vet) newVet = LastVisit.Vet;
  console.log('newVet:', newVet);
  console.log('Vet:', LastVisit.Vet);
  console.log('Reason', LastVisit.Reason);
  Visit.create({
    Pet: _id,
    Date: dateParsed,
    Reason: LastVisit.Reason,
    Vet: newVet,
  })
    .then((visit) => {
      res.locals.lastVisit = visit;
      console.log('visit updated', visit);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'Error in petController.updateVisits, unable to update',
        status: 418,
        message: {
          err: 'Cannot update',
        },
      });
    });
};

petController.getNotes = (req, res, next) => {
  console.log('Looking for all notes...');
  const { Pet } = req.body;
  if (!_id) {
    return next({
      log: 'Error in petController.getNotes, when retrieving _id',
    });
  }
  Note.find({ Pet })
    .then((notes) => {
      console.log('these are your pets notes', notes);
      res.locals.allNotes = notes;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in getNotes, cannot retrieve notes from database',
        message: 'Cannot retrieve notes.',
      });
    });
};

petController.addNote = (req, res, next) => {
  console.log('Adding new note...');
  const { Pet } = req.body;
  const addThis = req.body.Note;
  console.log('pet input note', Pet, Note);
  if (!Pet || !Note) {
    return next({
      log: 'Error in petController. update notes, missing pet/date/note input',
      messgage: 'Missing input',
    });
  }
  // const date = new Date(Date);
  // // const dateParsed = date.toDateString();
  // console.log('note dateparsed:', dateParsed);
  // if (isNaN(date)) {
  //   console.log('Invalid date. Please use the YYYY-MM-DD format');
  //   return next();
  // }
  console.log('before creation')
  Note.create({ Pet, Note: addThis })
    .then((newN) => {
      console.log('Note Added:', newN);
      res.locals.newNote = newN;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in petController.updateNotes, unable to create new note',
        message: {
          err: 'why',
        },
      });
    });
};
module.exports = petController;
