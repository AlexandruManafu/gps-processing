const mongoose = require('mongoose')

const GpsPointSchema = new mongoose.Schema({
  "Nr": { type: String, required: true },
  "Vehicul": { type: String, required: true },
  "Data": { type: String, required: true },
  "Pozitia": { type: String, required: true },
  "Lat": { type: String, required: true },
  "Lng": { type: String, required: true },
  "Stare heblu": { type: String, required: true },
  "Viteza": { type: String, required: true },
  "Buton panica": { type: String, required: true },
  "Motor auxiliar": { type: String, required: true },
  "Motor cu perii": { type: String, required: true },
  "Pompa hidraulica": { type: String, required: true },
  "Nivel carburant": { type: String, required: true },
  "AIN": { type: String, required: true },
  "Turatie sasiu": { type: String, required: true },
  "Index kilometri": { type: String, required: true },
  "Consum combustibil": { type: String, required: true },
  "Turatie auxiliar": { type: String, required: true },
  "Actionare frana": { type: String, required: true },
  "Actionare ambreiaj": { type: String, required: true },
  "Sistem auxiliar 1 Lichid": { type: String, required: true },
  "Sistem auxiliar 1 Solid": { type: String, required: true },
  "Sistem auxiliar 2 fara SA1": { type: String, required: true },
  "Sistem auxiliar 2 cu SA1": { type: String, required: true },
  "Sistem auxiliar 2 Total": { type: String, required: true },
  "Can": { type: String, required: true }
});

module.exports = mongoose.model('GpsPointSchema', GpsPointSchema);