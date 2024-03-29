const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/users', userController.getAllUsers);

module.exports = router;
