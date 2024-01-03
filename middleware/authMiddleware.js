const jwt = require('jsonwebtoken');
const User = require('../models/User');
const  { ObjectId }  = require ('mongodb');

exports.authenticateToken = (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) return res.sendStatus(401);

  const token = bearerToken.split("Bearer")[1].trim()

  jwt.verify(token, process.env.SECRET_KEY, async(err, decoded) => {
    if (err) return res.send({statusCode:403,message:err});
    const user = await User.findOne({ _id: new ObjectId(decoded.userId) });

    if(!user){
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
