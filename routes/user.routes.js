const express = require('express');
const router = express.Router();
const { signUp, login, logout, getCouponCode, bookShow } = require('../controllers/user.controllers.js');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getCouponCode', getCouponCode);
router.post('/bookShow', bookShow);

module.exports = router;