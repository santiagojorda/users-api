const bcrypt = require('bcrypt')
const User = require('../models/user')
const HTTP = require('../utils/http_codes')

const userRequiredFieldsAreCompleted = (user) => {
    return user.username && user.password && user.email
}

const userFieldsAreCorrect = (user) => {
    return true
}

const thisUserAlredyExist = async (user) => {
    const userFinded = await User
        .findOne({username: user.username})
        
    if(!userFinded)
        return false
    return true
}

const signinMiddleware = async (req, res, next) => {

    const {username, password, email} = req.body

    const newUser = new User({
        username: username,
        password: password,
        email: email
    })

    if(!userRequiredFieldsAreCompleted(newUser))
        res.status(HTTP.SERVER.BAD_REQUEST).json({error: 'username, password and email are required'})
    else if(!userFieldsAreCorrect(newUser))
        res.status(HTTP.SERVER.BAD_REQUEST).json({error: 'username, password or email has an incorrect format'})
    else if(await thisUserAlredyExist(newUser))
        res.status(HTTP.SERVER.BAD_REQUEST).json({error: 'this user already exist'})
    else{
        req.user = newUser
        next()
    }
    
}

module.exports = signinMiddleware