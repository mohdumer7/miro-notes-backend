const { catchAsync } = require('../helpers/controllerHelper');
const User = require('../models/User');

//get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({}, '_id username');
    res.json(users);
  });