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
    },

    isVerificated: {
        type: Boolean,
        require: true,
        default: false
    },
    
    verificationToken: {
        type: String,
        default: 'thisIsAToken'
    }

})

module.exports = mongoose.model("User", UserSchema)