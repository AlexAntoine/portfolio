const mongoose = require('mongoose');

const localDB = async()=>{
    return await mongoose.connect('mongodb://localhost:27017/project-api'.cyan.blue,{useNewUrlParser:true, useUnifiedTopology: true })
}

const prodDB = async()=>{

}

module.exports = {
    localDB
}