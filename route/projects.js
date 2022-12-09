const express = require('express');
const router = express.Router();
const {getAllProjects} = require('../controller/projects')

router.route('/').get(getAllProjects);


module.exports = router;