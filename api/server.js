const express = require('express');
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')


const { logger } = require('./middleware/middleware')
const server = express();


const userRouter = require('./users/users-router')

server.use(helmet())
server.use(cors())
server.use(morgan('dev'))

server.use(express.json())
server.use(logger)

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
server.use('/api/users', userRouter)



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

