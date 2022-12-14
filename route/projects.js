const express = require('express');
const router = express.Router();
// const upload = require('../middleware/upload');

const {getAllProjects, getSingleProject, createProject, uploadPhotos, updateProject, deleteProject, uploadContent, uploadImages} = require('../controller/projects')

router.route('/').get(getAllProjects).post(createProject);

router.route('/:id').get(getSingleProject).put(updateProject).delete(deleteProject).post(uploadPhotos);

router.route('/:id/content').post(uploadContent);

module.exports = router;