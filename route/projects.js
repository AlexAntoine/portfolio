const express = require('express');
const router = express.Router();
const {getAllProjects, getSingleProject, createProject, updateProject, deleteProject} = require('../controller/projects')

router.route('/').get(getAllProjects).post(createProject);

router.route('/:id').get(getSingleProject).put(updateProject).delete(deleteProject);


module.exports = router;