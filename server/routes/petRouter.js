const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const petController = require('../controllers/petController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

//createPet path='http://localhost:3000/pet/create'
router.post(
  '/create',
  // sessionController.checkSession,
  petController.createPet,
  (req, res) => {
    res.status(200).json(res.locals.petObj);
  }
);

//updatePet path="http://localhost:3000/pet/update"
//currently does not send back updatedPet, only new instance of new Visit (lastVisit)
router.patch(
  '/update',
  // sessionController.checkSession,
  petController.updatePet,
  petController.updateVisits,
  (req, res) => {
    const responseObject = {
      updatedPet: res.locals.updatedPet,
      lastVisit: res.locals.lastVisit,
    };
    return res.status(200).json(responseObject);
  }
);

//deletePet :: path="http://localhost:3000/pet/delete"
router.delete(
  '/delete',
  // sessionController.checkSession,
  petController.deletePet,
  (req, res) => {
    return res.status(200).json(res.locals.deletedPet);
  }
);

module.exports = router;
