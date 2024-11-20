const express = require('express');
const router = express.Router();
const { findAllArtists } = require('../controllers/artist.controllers.js');

router.get('/artists', findAllArtists);

module.exports = router;
