require('dotenv').config({path:'./config/.env'});
const express = require('express');
const {localDB} = require('./db/mongoose');
const colors = require('colors');
const path = require('path');

const app = express();
app.use(express.json());

//Routes
const projectsRouter = require('./route/projects');

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/projects', projectsRouter)

module.exports = app;