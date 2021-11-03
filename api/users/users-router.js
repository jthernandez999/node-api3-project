const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model')
const Post = require('../posts/posts-model')
// The middleware functions also need to be required
const { logger,
        validatePost, 
        validateUserId, 
        validateUser
      } = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      if(users) {
      res.status(200).json(users)
    
  } else {
    res.status(404).json({ 
      message: 'users could not be found'
    })
  }
  })
    .catch(err => {
      res.status(500).json({
        message:"unable to retrieve information from the database", 
        error: err.message
      })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  User.getById(req.params.id)
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: 'The post with the specified ID does not exist'
        })
      }
    })
    
});

router.post('/', validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: 'something went wrong in the user router', 
    message: err.message, 
    stack: err.stack,
  })
})

// do not forget to export the router
module.exports = router 
