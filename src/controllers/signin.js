const User = require('../models/user')

const signinCtrl = (req, res) => {

    const {username, password, email} = req.body

    const newUser = new User({
        username: username,
        password: password,
        email: email
    })

    newUser
        .save()
        .then((err, savedUser) => {
            res.status(201).json(savedUser)
        })
        .catch((err) => console.error(err))
    
}   

module.exports = signinCtrl