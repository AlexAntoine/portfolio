const Projects = require('../models/projects');
const path = require('path')
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

        return next(new ErrorResponse(`No projects with the id of ${req.params.id}`,404))
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
        return next(new ErrorResponse(`No projects with the id of ${req.params.id}`,404))
    }

    await project.remove();

    res.status(200).json({success: true, data:{}});
});

// @desc Create a project
// @route POST /api/v1/projects
// @Access Public
exports.createProject = asyncHandler(async(req, res, next)=>{

    const result = await Projects.create(req.body);

    res.status(201).json({success: true, data:result})
});

// @desc Upload photos
// @route POST /api/v1/projects/:projectId
// @Access Public
exports.uploadPhotos = asyncHandler(async(req, res, next)=>{
   
    const project = await Projects.findById(req.params.id);

    if(!project){
        return next(new ErrorResponse(`The project with the ID of ${req.params.id} has not been found`, 404))
    }

    const image = req.files.file;

    if(!image.mimetype.startsWith('image')){

        return next(new ErrorResponse(`Please upload and image file`,400));
    }

    //Create custom file name
    image.name = `photo_${project._id}${path.parse(image.name).ext}`;

    image.mv(`./public/uploads/${image.name}`, async err =>{

        if(err){
            console.log(err)
            return next(new ErrorResponse(`Problem with file upload`,500));
        }

        await Projects.findByIdAndUpdate(req.params.id,{main_image:image.name});

        res.status(200).json({success:true, data:image.name});
    });
});

// @desc upload content images
// @route POST /api/v1/projects/:projectId/content
// @Access Public
exports.uploadContent = asyncHandler(async(req, res, next)=>{

    const project = await Projects.findById(req.params.id);

    if(!project){
        return next(new ErrorResponse(`The project with the ID of ${req.params.id} has not been found`, 404));
    }
    
    const image = req.files.file;
    const image_name = req.body.name;
   
});
