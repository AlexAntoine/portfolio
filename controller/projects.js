const Projects = require('../models/projects');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc Get all Projects
// @route Get /api/v1/projects
// @Access Public
exports.getAllProjects = asyncHandler(async(req, res, next)=>{
    const result = await Projects.find();

    res.status(200).json({success: true, data:result})
});

// @desc Get single Project
// @route Get /api/v1/projects/:projects
// @Access Public
exports.getSingleProject = asyncHandler(async(req, res, next)=>{

    const project = await Projects.findOne({_id:req.params.id})

    if(!project){

        return next(new ErrorResponse(`No projects with the id of ${req.params.id}`), 404)
    }

    res.status(200).json({success: true, data:project});
});

// @desc Update Project
// @route PUT /api/v1/projects/:projects
// @Access Public
exports.updateProject = asyncHandler(async(req, res, next)=>{
    
   const updateProject = await Projects.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators: true
    });

    res.status(200).json({success: true, data:updateProject});
});

// @desc Delete Project
// @route Delete /api/v1/projects/:projects
// @Access Public
exports.deleteProject = asyncHandler(async(req, res, next)=>{

    const project = await Projects.findById(req.params.id);

    if(!project){
        return next(new ErrorResponse(`No projects with the id of ${req.params.id}`),404)
    }

    await project.remove();

    res.status(200).json({success: true, data:{}});
});

// @desc Create a project
// @route POST /api/v1/projects
// @Access Public
exports.createProject = asyncHandler(async(req, res, next)=>{
    
    const result = await Projects.create(req.body);
    console.log('line 64: ', result)

    // res.status(200).json({success: true, data:result})
});


