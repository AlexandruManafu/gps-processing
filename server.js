//require('dotenv').config()

// Use the PORT environment variable set by Heroku or default to 3000
const port = process.env.PORT || 3000

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const gpsPointsRouter = require('./routes/gpsPoints');
app.use('/gpsPoints', gpsPointsRouter)

app.listen(port, () => console.log('Server Started'))