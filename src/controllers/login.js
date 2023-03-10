const User = require("../models/user")

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
        res.status(401).json({message: 'username or password are incorrect'})
    res.status(200).json({message: `${username} has successfully logged in`})

}

module.exports = loginCtrl