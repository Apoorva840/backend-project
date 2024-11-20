const express = require('express');
const router = express.Router();
const { findAllGenres } = require('../controllers/genre.controllers.js');

router.get('/genres', findAllGenres);

module.exports = router;