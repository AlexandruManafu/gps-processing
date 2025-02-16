const express = require('express')
const router = express.Router()
const GpsPoint = require("../models/gpsPoint");

// Getting all
router.get('/', async (req, res) => {
  try {
    const value = await GpsPoint.find()
    res.json(value)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', getValue, (req, res) => {
  res.json(res.value)
})

// Creating one
router.post('/', async (req, res) => {
  let val = req.body;
  if(!Array.isArray(val)){
    val = [val];
  }
  try {
    const newVal = await GpsPoint.insertMany(val);
    res.status(201).json(newVal)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getValue, async (req, res) => {
  try {
    await res.value.remove()
    res.json({ message: 'Deleted Value' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getValue(req, res, next) {
  let value
  try {
    value = await GpsPoint.findById(req.params.id)
    if (value == null) {
      return res.status(404).json({ message: 'Cannot find Point' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.value = value
  next()
}

module.exports = router