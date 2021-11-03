const User = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${req.method}] ${req.url}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params
  User.getById(id)
  .then( user => {
    if(!user) {
    res.status(404).json({ message: 'user not found'})
  } else {
    req.user = user 
    next()
  } 
  })
  .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('')
  next()
}

// do not forget to expose these functions to other modules

module.exports = {
  logger, 
  validateUserId, 
  validateUserId, 
  validatePost, 
  validateUser
}