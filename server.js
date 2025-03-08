//require('dotenv').config()

// Use the PORT environment variable set by Heroku or default to 3000
const port = process.env.PORT || 3000

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const GpsPoint = require("./models/gpsPoint");
const PlannedRoute = require("./models/plannedRoute");

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const gpsPointsRouter = require('./routes/crud')(GpsPoint);
app.use('/gpsPoints', gpsPointsRouter)

const plannedRouter = require('./routes/crud')(PlannedRoute);
app.use('/plannedRoute', plannedRouter)

const dailyRouter = require('./routes/dailyReport');
app.use('/dailyReport', dailyRouter)

const cumulatedRouter = require('./routes/cumulatedReport');
app.use('/cumulatedReport', cumulatedRouter)

app.listen(port, () => console.log('Server Started'))