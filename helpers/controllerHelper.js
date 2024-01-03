const { validationResult } = require('express-validator');

// Common try-catch wrapper for controllers
exports.catchAsync = (fn) => {
  return (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    fn(req, res, next).catch(next);
  };
};
