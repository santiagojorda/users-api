
const HTTP_BAD_REQUEST = 400

const userRequiredFieldsAreCompleted = (userFields) => {
    return userFields.username && userFields.password 
}

const loginMiddleware = (req, res, next) => {

    const {username, password} = req.body

    const userFields = {
        username: username,
        password: password
    }

    if(!userRequiredFieldsAreCompleted(userFields))
        res.status(HTTP_BAD_REQUEST).json({error: 'username and password are required'})
    else
        next()
}

module.exports = loginMiddleware