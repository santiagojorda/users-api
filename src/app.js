const express = require('express')
const app = express()

require('./config/env_vars_init')
const PORT = process.env.PORT
const HOST = process.env.HOST

app.listen(PORT, HOST, (req, res) => {
    console.log(`server initialized successfully: ${HOST}:${PORT}`)
})