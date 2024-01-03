// routes/authRoutes.js
const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Routes for authentication
router.post(
  '/signup',
  [
    check('fullName').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage("Invalid Email"),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  authController.signup
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage("Invalid Email"),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

module.exports = router;
