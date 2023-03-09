
const signin = (req, res) => {

    const {username, password, email} = req.body
    console.log('username trying to be part: ' + username)
    if(!username || !password || !email)
        res.status(400).json({error: 'username, password and email required'})
    else 
        res.status(201).json({username: username})
}   

module.exports = signin