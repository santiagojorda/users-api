const User = require("../models/user")

const HTTP_SUCCESSFULL = 200
const HTTP_UNAUTHORIZED = 401 
const HTTP_ACCESS_FORBIDDEN = 403 

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
        res.status(HTTP_UNAUTHORIZED).json({error: 'username or password are incorrect'})
    else if(!userFinded.isVerificated)
        res.status(HTTP_ACCESS_FORBIDDEN).json({error: 'the user has not been validated'})
    res.status(HTTP_SUCCESSFULL).json({message: `${username} has successfully logged in`})

}

module.exports = loginCtrl