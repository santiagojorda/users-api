/*  DEPENDENCIES: dotenv
    ENVIROMENT_VARIABLES_PATH contains the path of the files and initial name of the files of environment:
        .env.producction
        .env.development
        .env.VARIABLES-NAME
    package.json runs script indicating the name of the actual enviroment like:
        SET NODE_ENV=development& nodemon src/app
        SET NODE_ENV=production& node src/app
*/ 
const ENVIROMENT_VARIABLES_PATH = 'src/config/.env.'

process.env.NODE_ENV = process.env.NODE_ENV || 'development' 
require('dotenv').config({ path: ENVIROMENT_VARIABLES_PATH + process.env.NODE_ENV})
console.log("---- ENVIRONMENT: " + process.env.NODE_ENV)