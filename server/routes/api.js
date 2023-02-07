const express = require('express');

const userController = require('../controllers/userController');
const petController = require('../controllers/petController');
const router = express.Router();

const cors = require('cors');
router.use(cors({ origin: 'http://localhost:3001' }));

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

//verifies user and returns user info with array of pet objects
router.post(
  '/connect/',
  userController.getUserUltimate,
  petController.getPetUltimate,
  (req, res) => {
    return res.status(200).json([res.locals.user, res.locals.returnedPets]);
  }
);

module.exports = router;
