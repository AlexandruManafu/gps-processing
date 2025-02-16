const mongoose = require('mongoose')

const GpsPointSchema = new mongoose.Schema({
  Vehicul: {
    type: String,
    required: true
  },
  Pozitia: {
    type: String,
    required: true
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  }
})

module.exports = mongoose.model('GpsPointSchema', GpsPointSchema);