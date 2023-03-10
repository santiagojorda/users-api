
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
        res.status(400).json({error: 'username and password are required'})
    next()
}

module.exports = loginMiddleware