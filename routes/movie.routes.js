const express = require('express');
const router = express.Router();
const { findAllMovies, findOne, findShows, getMovies } = require('../controllers/movie.controllers.js');

router.get('/movies', findAllMovies, getMovies);
router.get('/movies/:movieId', findOne);
router.get('/movies/:movieId/shows', findShows)

module.exports = router;
