const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const petController = require('../controllers/petController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const cors = require('cors');
router.use(cors({ origin: 'http://localhost:3001' }));

//createPet path='/'
// http://localhost:3000/pet
//send the following request : { "Name":"Eden"}
//response : {"Name":"Eden","_id":"63e122dec28e402e8a5648ef","__v":0}
router.post('/pets', petController.createPet, (req, res) => {
  res.status(200).json(res.locals.newPet);
});

//getPet
// http://localhost:3000/pet/:pet
// response: [{"_id":"63e122dec28e402e8a5648ef","Name":"Eden","__v":0}]
router.get('/pets/:pets', petController.getPet, (req, res) => {
  res.status(200).json(res.locals.pet);
});

//updatePet
//http://localhost:3000/api/pets/Eden
//send the following request : { "Name":"éden", "Age":18}
//response : {"_id":"63e122dec28e402e8a5648ef","Name":"éden","__v":0,"Age":18}
router.patch('/pets/:pets', petController.updatePet, (req, res) => {
  return res.status(200).json(res.locals.updatedPet);
});

//deletePet
//http://localhost:3000/api/pets/éden
//response : {"_id":"63e122dec28e402e8a5648ef","Name":"éden","__v":0,"Age":18}
router.delete('/pets/:pets', petController.deletePet, (req, res) => {
  return res.status(200).json(res.locals.deletedPet);
});

//verifies user and returns user info with array of pet objects
router.post('/connect/', petController.getPetUltimate, (req, res) => {
  return res.status(200).json([res.locals.user, res.locals.returnedPets]);
});

module.exports = router;
