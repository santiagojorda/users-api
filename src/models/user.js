const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({

    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
    }

})

module.exports = mongoose.model("User", UserSchema)