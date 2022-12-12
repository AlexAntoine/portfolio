require('dotenv').config({path:'./config/.env'});
const mongoose = require('mongoose');
const express = require('express');
const {localDB} = require('./db/mongoose');
const colors = require('colors');
const path = require('path');

mongoose.set('strictQuery', true)

const app = express();
app.use(express.json());

localDB();

//Routes
const projectsRouter = require('./route/projects');

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/projects', projectsRouter)

module.exports = app;