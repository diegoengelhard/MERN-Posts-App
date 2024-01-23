var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// Imports cors middleware
const cors = require('cors');

// Imports mongoose configuration
const mongoose = require('./config/mongoose');

// Imports index router middleware
const apiRouter = require('./routes/api/index.router');

// Impots error handler middleware
const errorHandler = require('./middlewares/error.middleware');

// Mounts error handler middleware
app.use(errorHandler);

// Connects to MongoDB
mongoose.connect();

// Enables cors
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mounts index router middleware
app.use("/api", apiRouter);

module.exports = app;
