const express = require('express')
const router = express.Router()
const User = require('../models/user')


const signinCtrl = require('../controllers/signin')
const signinMiddleware = require('../middlewares/signin')
router.post("/signin", signinMiddleware, signinCtrl)

router.post("/login", require('../controllers/login'))
// router.post("/logout", require('../controllers/logout'))

module.exports = router 