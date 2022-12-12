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
    const result = await Projects.find();

    res.status(200).json({success: true, data:result})
});

// @desc Get single Project
// @route Get /api/v1/projects/:projects
// @Access Public
exports.getSingleProject = asyncHandler(async(req, res, next)=>{

    const project = await Projects.findOne({_id:req.params.id})

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
    console.log('line 36: ', updateProject);
    res.status(200).json({success: true, data:updateProject});
});

// @desc Delete Project
// @route Delete /api/v1/projects/:projects
// @Access Public
exports.deleteProject = asyncHandler(async(req, res, next)=>{

    const project = await Projects.findById(req.params.id);

    await project.remove();

    res.status(200).json({success: true, data:{}});
});