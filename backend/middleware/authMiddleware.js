const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_TOKEN)
      //   console.log(decoded)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (err) {
      console.log(err)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Unauthorized access')
  }

  //   next()
})

module.exports = { protect }
