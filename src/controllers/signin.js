const User = require('../models/user')


const signinCtrl = (req, res) => {

    const {username, password, email} = req.body

    const newUser = new User({
        username: username,
        password: password,
        email: email
    })

    newUser
        .save()
        .then((err, savedUser) => {
            res.status(201).json(savedUser)
        })
        .catch((err) => console.error(err))

    // newUser.save((err) => {
    //     if(err){
    //         console.log('there was an saving user error')
    //         console.log(err)
    //         res.status(401).json({message: err})
    //     }
    //     else {
    //         console.log('user created successfully')
    //     }
        
    // })
    // res.status(201).json({username: username})
    
}   

module.exports = signinCtrl