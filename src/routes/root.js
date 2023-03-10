const express = require('express')
const router = express.Router()


const signinCtrl = require('../controllers/signin')
const signinMiddleware = require('../middlewares/signin')
router.post("/signin", signinMiddleware, signinCtrl)

const loginCtrl = require('../controllers/login')
const loginMiddleware = require('../middlewares/login')
router.post("/login", loginMiddleware, loginCtrl)

module.exports = router 