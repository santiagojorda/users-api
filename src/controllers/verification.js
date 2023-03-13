const User = require('../models/user')

const HTTP_SUCCESSFULL = 200
const HTTP_UNAUTHORIZED = 401 
const HTTP_ACCESS_FORBIDDEN = 403 

const verifyUser = async (user, verificationTokenProvided) => {
    if(user.verificationToken === verificationTokenProvided)
        await User.updateOne({email: user.email}, {isVerificated: true})
    else
        console.log('el codigo de verifiacion es incorrecto')
}

const verification = async (req, res) => {
    const {userEmail, verificationToken} = req.query

    const userFinded = await User.findOne({ $email: userEmail})

    if(!userFinded){
        res.status(HTTP_ACCESS_FORBIDDEN).json({error: `${userFinded.email} is not registered`})
        // no existe
    }
    else if(isVerificated){
        res.status(HTTP_SUCCESSFULL).json({message: `${userFinded.email} is already registered`})
        // it's already verificated
    }
    // not verificated
    await verifyUser(userFinded, verificationToken)
    res.status(HTTP_SUCCESSFULL).json({message: `${userFinded.email} has been verificated successfully`})
}
module.exports = verification