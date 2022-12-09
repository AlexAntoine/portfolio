const Projects = require('../models/projects');
const asyncHandler = require('../middleware/asyncHandler');

const data= {
    name:'alex',
    age: 12
}
// @desc Get all Projects
// @route Get /api/v1/projects
// @Access Public
exports.getAllProjects = asyncHandler(async(req, res, next)=>{
    console.log('hello')
    const result = await Projects.findOne();

    console.log('line 15: ',result);
})