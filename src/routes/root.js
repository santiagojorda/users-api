const express = require('express')
const router = express.Router()

router.get("/signin", require('../controllers/signin'))

module.exports = router 