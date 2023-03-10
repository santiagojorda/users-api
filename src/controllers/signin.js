const User = require('../models/user')

const signinCtrl = (req, res) => {

    const newUser = req.user

    newUser
        .save()
        .then((err, savedUser) => {
            res.status(201).json(savedUser)
        })
        .catch((err) => console.error(err))
    
}   

module.exports = signinCtrl