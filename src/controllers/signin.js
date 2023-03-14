const User = require('../models/user')
const HTTP = require('../utils/http_codes')
const signinCtrl = (req, res) => {

    const newUser = req.user

    newUser
        .save()
        .then((err, savedUser) => {
            res.status(HTTP.RESPONSE.CREATED).json(savedUser)
        })
        .catch((err) => console.error(err))
    
}   

module.exports = signinCtrl