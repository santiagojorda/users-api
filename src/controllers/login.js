const User = require("../models/user")
const HTTP = require('../utils/http_codes')

const loginCtrl = async (req, res) => {
    
    const {username, password} = req.body

    const userFinded = await User
        .findOne({ 
            $and: [
                {username: username}, 
                {password: password}
            ]
        })
        .then((userFinded) => userFinded)

    if(!userFinded)
        res.status(HTTP.SERVER.UNAUTHORIZED).json({error: 'username or password are incorrect'})
    else if(!userFinded.isVerificated)
        res.status(HTTP.SERVER.ACCESS_FORBIDDEN).json({error: 'the user has not been validated'})
    res.status(HTTP.REQUEST.SUCCESFFULL).json({message: `${username} has successfully logged in`})

}

module.exports = loginCtrl