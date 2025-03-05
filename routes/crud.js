const express = require('express')
//const model = require("../models/gpsPoint");


const crudRouter = (model)=> {
  const router = express.Router()
  // Getting all
  router.get('/', async (req, res) => {
    try {
      const value = await model.find()
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
      const newVal = await model.insertMany(val);
      res.status(201).json(newVal)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  // Deleting One
  router.delete('/:id', async (req, res) => {
    try {
      const result = await model.findByIdAndDelete(req.params.id);
      if(result != null){
        res.json({ message: 'Deleted Value' })
      } else {
        throw new Error("Cannot Find "+req.params.id);
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  async function getValue(req, res, next) {
    let value
    try {
      value = await model.findById(req.params.id)
      if (value == null) {
        return res.status(404).json({ message: 'Cannot find Point' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }

    res.value = value
    next()
  }

  return router;
}

module.exports = crudRouter