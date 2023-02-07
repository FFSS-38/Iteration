const express = require('express');
const { Users, Pets } = require('../database.js');
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const petsController = require('../controllers/petsController');
const router = express.Router();

const cors = require('cors');
router.use(cors({ origin: 'http://localhost:3001' }));

//createUser
// http://localhost:3000/api/users/
//send the following request : { "Name":"Pierre", "Password":"Jacquemin"}
//response: {"Name":"Pierre","Password":"Jacquemin","Pets":[],"_id":"63e1213bcb9b9423d0ba43a7","__v":0}
router.post('/users', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

//getUser
// http://localhost:3000/api/Pierre
// response: [{"_id":"63e1213bcb9b9423d0ba43a7","Name":"Pierre","Password":"Jacquemin","Pets":[],"__v":0}]
router.get('/:users', userController.getUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

//createPet
// http://localhost:3000/api/pets
//send the following request : { "Name":"Eden"}
//response : {"Name":"Eden","_id":"63e122dec28e402e8a5648ef","__v":0}
router.post('/pets', petsController.createPet, (req, res) => {
  res.status(200).json(res.locals.newPet);
});

//getPet
// http://localhost:3000/api/pets/Eden
// response: [{"_id":"63e122dec28e402e8a5648ef","Name":"Eden","__v":0}]
router.get('/pets/:pets', petsController.getPet, (req, res) => {
  res.status(200).json(res.locals.pet);
});

//updatePet
//http://localhost:3000/api/pets/Eden
//send the following request : { "Name":"éden", "Age":18}
//response : {"_id":"63e122dec28e402e8a5648ef","Name":"éden","__v":0,"Age":18}
router.patch('/pets/:pets', petsController.updatePet, (req, res) => {
  return res.status(200).json(res.locals.updatedPet);
});

//deletePet
//http://localhost:3000/api/pets/éden
//response : {"_id":"63e122dec28e402e8a5648ef","Name":"éden","__v":0,"Age":18}
router.delete('/pets/:pets', petsController.deletePet, (req, res) => {
  return res.status(200).json(res.locals.deletedPet);
});

//ultimate route
//http://localhost:3000/api/connect
//send the following request: {"Name": "Pierre", "Password": "Jacquemin"}
//response : [
//     {
//       "_id": "63e1213bcb9b9423d0ba43a7",
//       "Name": "Pierre",
//       "Password": "Jacquemin",
//       "Pets": [],
//       "__v": 0
//   },
//   [
//       {
//           "_id": "63e1523fa559f05e7fe59fcb",
//           "Name": "Eden",
//           "Owner": "63e1213bcb9b9423d0ba43a7",
//           "__v": 0
//       },
//       {
//           "_id": "63e153d4a559f05e7fe59fd4",
//           "Name": "Simba",
//           "Weight": 2000,
//           "Owner": "63e1213bcb9b9423d0ba43a7",
//           "__v": 0
//       }
//   ]
// ]

router.post(
  '/connect/',
  userController.getUserUltimate,
  petsController.getPetUltimate,
  (req, res) => {
    return res.status(200).json([res.locals.user, res.locals.returnedPets]);
  }
);

module.exports = router;
