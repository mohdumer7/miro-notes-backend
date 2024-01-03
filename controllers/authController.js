const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { catchAsync } = require('../helpers/controllerHelper');

// Register a new user
const signup = catchAsync(async (req, res) => {
  const { email, password, fullName } = req.body;

  // Check if the email is already taken
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Create a new user
  const newUser = new User({ email, password: password, fullName });
  await newUser.save();

  // Return success message or token if needed
  res.status(201).json({ message: 'User registered successfully' });
});

// Login an existing user
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Compare passwords
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create and return a JWT token
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ token });
});

module.exports = { signup, login };
