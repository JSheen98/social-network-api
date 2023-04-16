// Require variables
const express = require('express')
const db = require('./config/connection')
const routes = require('./routes')

// Port for server use
const PORT = process.env.port || 3001
// Create app variable using express
const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

// Use db from config and start the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}! 👽`)
    })
})
