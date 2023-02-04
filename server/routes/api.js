const express = require('express');

const starWarsController = require('../controllers/starWarsController');

const router = express.Router();

router.get('/', starWarsController.getCharacters, (req, res) =>
  res.status(200).json(res.locals.ads)
);

router.get('/species', starWarsController.getSpecies, (req, res) =>
  res.status(200).json(res.locals.species[0])
);

router.get('/homeworld', starWarsController.getHomeworld, (req, res) =>
  res.status(200).json(res.locals.homeworld)
);

router.get('/film', starWarsController.getFilm, (req, res) =>
  res.status(200).json({})
);

router.post('/createad', starWarsController.addCharacter, (req, res) =>
  res.status(200).json({})
);

router.delete('/delete/:id', starWarsController.deleteAds, (req, res) =>
  res.status(200).json(res.locals.deletems)
);
module.exports = router;
