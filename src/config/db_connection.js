/*
    DEPENDENCIES: dotenv
    ENVIROMENT_VARIABLES_PATH contains the path of the files and initial name of the files of environment:
        DB_HOST 
*/ 
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const {DB_HOST} = process.env
const DB_USERS = DB_HOST + '/users'

const connectDB = () => {
    mongoose.connect("mongodb://"+DB_USERS)
    .then( () => console.log(`MongoDb conectado correctamente a: ${DB_HOST}`))
    .catch( (err) => console.log(`MongoDb no se conecto correctamente:  ` + err))
}

connectDB()