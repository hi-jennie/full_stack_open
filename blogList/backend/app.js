const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogRouter = require('./controllers/blog');

const app = express();

logger.info('connecting to', config.mongoUrl);

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
