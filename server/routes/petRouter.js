const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const petController = require('../controllers/petController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

const cors = require('cors');
router.use(cors({ origin: 'http://localhost:8080' }));

//createPet :: path='http://localhost:3000/pet/create'
router.post(
  '/create',
  sessionController.checkSession,
  petController.createPet,
  (req, res) => {
    res.status(200).json(res.locals.petObj);
  }
);

//updatePet :: path="http://localhost:3000/pet/update"
router.patch(
  '/update',
  sessionController.checkSession,
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

//getallVisits 
//need Pet
router.post('/visits', (req, res) => {
  return res.send(200).json(res.locals.allVisits);
})

//getNotes :: path="http://localhost:3000/pet/notes"
//please send pet _id in body
router.post(
  '/notes',
  // sessionController.checkSession,
  petController.getNotes,
  (req, res) => {
    return res.status(200).json(res.locals.allNotes);
  }
);

//addNotes :: path="http://localhost:3000/pet/notes/new"
router.post(
  '/notes/new',
  // sessionController.checkSession,
  petController.addNote,
  (req, res) => {
    return res.status(200).json(res.locals.newNote);
  }
);

//deletePet :: path="http://localhost:3000/pet/delete"
router.delete(
  '/delete',
  sessionController.checkSession,
  petController.deletePet,
  (req, res) => {
    return res.status(200).json(res.locals.deletedPet);
  }
);

module.exports = router;
