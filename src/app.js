const express = require('express')
const app = express()
const bodyParser = require('body-parser')

require('./config/env_vars_init')
const {PORT, HOST} = process.env

app.use(bodyParser.json());

require('./config/db_connection')
app.use('/usr/', require('./routes/root'))

app.listen(PORT, HOST, (req, res) => {
    console.log(`server initialized successfully: ${HOST}:${PORT}`)
})

module.exports = app