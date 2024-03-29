const logger = require('./logger');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unkonwn endpoint'})
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if(authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }

  next();
}

const userExtractor = async (request, response, next) => {
  let decodedToken = null;
  try{
    decodedToken = jwt.verify(request.token, process.env.SECRET);
  }catch(e){
    return response.status(401).json({ error: e.message })
  }
  const user = await User.findById(decodedToken.id);
  request.user = user;
  next();
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    console.log("JsonWebTokenErrorissa");
    return response.status(400).json({ error: error.message })
  } 
  
  next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    tokenExtractor,
    userExtractor,
    errorHandler
}