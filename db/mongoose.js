const mongoose = require('mongoose');

const localDB = async()=>{
    return await mongoose.connect('mongodb://127.0.0.1/project-api',{useNewUrlParser:true, useUnifiedTopology: true })
}

const prodDB = async()=>{

}

module.exports = {
    localDB
}