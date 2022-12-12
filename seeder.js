const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');
const {localDB} = require('./db/mongoose');
const Project = require('./models/projects');

mongoose.set('strictQuery', true)

localDB();


const projects = JSON.parse(fs.readFileSync(`${__dirname}/_data/projects.json`, 'utf-8'));

const importData = async()=>{

    try{
        await Project.create(projects);

        console.log('Data Imported....'.green.inverse)

        process.exit(1);

    }catch(e){
        console.log(error);
    }
}

const deleteData = async()=>{
    
    try{
        await Project.deleteMany();

        console.log('Data Deleted...'.red.inverse);

        process.exit(1)
    }catch(e){

        console.log(e)
    }
}

if(process.argv[2]=== '-i'){

    importData();

}else if(process.argv[2]=== '-d'){

    deleteData();
}