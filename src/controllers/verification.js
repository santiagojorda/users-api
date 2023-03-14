const User = require('../models/user')
const HTTP = require('../utils/http_codes')


const verifyUser = async (user, verificationTokenProvided) => {
    if(user.verificationToken === verificationTokenProvided)
        await User.updateOne({email: user.email}, {isVerificated: true})
    else
        console.log('el codigo de verifiacion es incorrecto')
}

const verification = async (req, res) => {
    const {userEmail, verificationToken} = req.query

    const userFinded = await User.findOne({ email: userEmail})

    if(!userFinded)
        res.status(HTTP.SERVER.ACCESS_FORBIDDEN).json({error: `${userFinded.email} is not registered`})
    if(userFinded.isVerificated)
        res.status(HTTP.REQUEST.SUCCESSFULL).json({message: `${userFinded.email} is already registered`})
    await verifyUser(userFinded, verificationToken)
    res.status(HTTP.REQUEST.SUCCESFFULL).json({message: `${userFinded.email} has been verificated successfully`})
}
module.exports = verification