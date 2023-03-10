
const loginCtrl = (req, res) => {
    const {username, password} = req.body
    if(!username || !password)
        res.status(400).json({error: 'username and password required'})
    else
        res.status(200).json({message: 'welcome'})
}

module.exports = loginCtrl