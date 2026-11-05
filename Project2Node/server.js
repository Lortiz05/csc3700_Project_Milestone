// server.js
// Load .env FIRST -- before anything reads process.env
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const courseRouter = require('./routes/courses')

const app = express()

app.use(cors())
app.use(express.json())

// All books routes live under /api -- e.g. /api/books
app.use('/api', courseRouter)

// Any route not matched above -- JSON 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`requests API running on http://localhost:${PORT}`)
})
