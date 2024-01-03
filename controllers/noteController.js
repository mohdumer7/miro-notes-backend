// controllers/noteController.js
const { catchAsync } = require('../helpers/controllerHelper');
const Note = require('../models/Note');
const User = require('../models/User');

// Get all notes for the authenticated user
exports.getNotes = catchAsync(async (req, res, next) => {
  const user = req.user;
  const notes = await Note.find({ owner: user._id });
  res.json(notes);
});

// Get a note by ID for the authenticated user
exports.getNoteById = catchAsync(async (req, res, next) => {
  const user = req.user;
  const noteId = req.params.id;
  const note = await Note.findOne({ _id: noteId, owner: user._id });
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
});

// Create a new note for the authenticated user
exports.createNote = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { title, content } = req.body;
  const note = new Note({ title, content, owner: user._id });
  await note.save();
  res.status(201).json({ message: 'Note created successfully',id:note.id });
});

// Update an existing note by ID for the authenticated user
exports.updateNote = catchAsync(async (req, res, next) => {
  const user = req.user;
  const noteId = req.params.id;
  const { title, content } = req.body;

  // Find the note and check ownership
  const note = await Note.findOne({ _id: noteId, owner: user._id });
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  // Update the note
  note.title = title;
  note.content = content;
  await note.save();

  res.json({ message: 'Note updated successfully' });
});

// Delete a note by ID for the authenticated user
exports.deleteNote = catchAsync(async (req, res, next) => {
  const user = req.user;
  const noteId = req.params.id;
  // Find the note and check ownership
  const note = await Note.findOne({ _id: noteId, owner: user._id });
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  // Delete the note
  await note.remove();

  res.json({ message: 'Note deleted successfully' });
});

//share notes with other users
exports.shareNote = catchAsync(async (req, res, next) => {
    const user = req.user;
    const noteId = req.params.id;
    const { userId, canEdit } = req.body; 
  
    // Find the note and check ownership
    const note = await Note.findOne({ _id: noteId, owner: user._id });
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
  
    // Find the user to share the note with
    const otherUser = await User.findById(userId);
    if (!otherUser) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Check if the note is already shared with the user
    const existingShare = note.sharedWith.find((share) => share.user.equals(otherUser._id));
    if (existingShare) {
      return res.status(400).json({ error: 'Note already shared with the user' });
    }
  
    // Share the note
    const share = {
      user: otherUser._id,
      canEdit: canEdit || false, // Default to read-only access if not specified
    };
  
    note.sharedWith.push(share);
    await note.save();
  
    res.json({ message: 'Note shared successfully', share });
  });

// Search for notes based on keywords for the authenticated user
exports.searchNotes = catchAsync(async (req, res, next) => {
  const user = req.user;
  const query = req.query.q;
  // Use MongoDB's $text operator for full-text search
  const notes = await Note.find(
      { $and: [{ owner: user._id }, { $text: { $search: query } }] },
      { score: { $meta: 'textScore' } } // Sort by text search relevance score
  ).select('-score -__v').sort({ score: { $meta: 'textScore' } });

  res.json(notes);
});