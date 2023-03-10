const bcrypt = require('bcrypt')
const User = require('../models/user')

const userRequiredFieldsAreCompleted = (user) => {
    return user.username && user.password && user.email
}

const userFieldsAreCorrect = (user) => {
    return true
}

const thisUserAlredyExist = async (user) => {
    const userFinded = await User
        .findOne({username: user.username})
        .then((userFinded) => userFinded)
        
    if(!userFinded)
        return false
    return true
}

const signinMiddleware = async (req, res, next) => {

    const {username, password, email} = req.body

    const newUser = {
        username: username,
        password: password,
        email: email
    }

    if(!userRequiredFieldsAreCompleted(newUser))
        res.status(400).json({error: 'username, password and email are required'})
    else if(!userFieldsAreCorrect(newUser))
        res.status(400).json({error: 'username, password or email has an incorrect format'})
    else if(await thisUserAlredyExist(newUser))
        res.status(400).json({error: 'this user already exist'})
    else
        next()
    
}

module.exports = signinMiddleware