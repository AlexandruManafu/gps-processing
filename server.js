require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const gpsPointsRouter = require('./routes/gpsPoints');
app.use('/gpsPoints', gpsPointsRouter)

app.listen(3000, () => console.log('Server Started'))