const express = require('express')
const router = express.Router()

router.post("/signin", require('../controllers/signin'))
// router.get("/login", require('../controllers/login'))
// router.get("/logout", require('../controllers/logout'))

module.exports = router 