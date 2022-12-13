require('dotenv').config({path:'./config/.env'});
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error')
const express = require('express');
const fileUpload = require('express-fileupload')
const {localDB} = require('./db/mongoose');
const colors = require('colors');
const path = require('path');

mongoose.set('strictQuery', true)

const app = express();

app.use(express.json());
// app.use(fileUpload());

localDB();

//Routes
const projectsRouter = require('./route/projects');

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/projects', projectsRouter);

app.use(errorHandler);

module.exports = app;