const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const petController = require('../controllers/petController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const cors = require('cors');
router.use(cors({ origin: 'http://localhost:3001' }));

// //getPet
// // http://localhost:3000/pet/:pet
// // response: [{"_id":"63e122dec28e402e8a5648ef","Name":"Eden","__v":0}]
// router.get('/pets/:pets', petController.getPet, (req, res) => {
//   res.status(200).json(res.locals.pet);
// });

//createPet path='http://localhost:3000/pet/createPet'
router.post('/createPet', petController.createPet, (req, res) => {
  res.status(200).json(res.locals.petObj);
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

module.exports = router;
