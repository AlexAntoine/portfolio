const express = require('express');
const advancedResults = require('../middleware/advanceResults');
const Projects = require('../models/projects');
const router = express.Router();
const {getAllProjects, getSingleProject, createProject, uploadPhotos, updateProject, deleteProject, uploadContent} = require('../controller/projects');

router.route('/').get(getAllProjects).post(createProject);

router.route('/:id').get(advancedResults(Projects), getSingleProject).put(updateProject).delete(deleteProject).post(uploadPhotos);

router.route('/:id/content').post(uploadContent)


module.exports = router;