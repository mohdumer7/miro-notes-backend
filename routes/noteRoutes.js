// routes/noteRoutes.js
const express = require('express');
const { check } = require('express-validator');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to authenticate the user for note routes
router.use(authMiddleware.authenticateToken);

// Routes for note operations
router.get('/', noteController.getNotes);
router.get('/search', [check('q').notEmpty().withMessage('Search query is required')], noteController.searchNotes);

router.get('/:id', noteController.getNoteById);

router.post(
  '/',
  [
    check('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    check('content').isLength({ min: 5 }).withMessage('Content must be at least 5 characters long'),
  ],
  noteController.createNote
);

router.put(
  '/:id',
  [
    check('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    check('content').isLength({ min: 5 }).withMessage('Content must be at least 5 characters long'),
  ],
  noteController.updateNote
);

router.delete('/:id', noteController.deleteNote);

router.post('/:id/share', [check('userId').notEmpty().withMessage('Username is required')], noteController.shareNote);

module.exports = router;
