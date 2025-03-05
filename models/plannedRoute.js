const mongoose = require('mongoose');

const PlannedRouteSchema = new mongoose.Schema({
  "tip": { type: String, required: true },
  "strada": { type: String, required: true},
  "data": { type: String, required: true},
  "luni": { type: Boolean, required: true},
  "marti": { type: Boolean, required: true},
  "miercuri": { type: Boolean, required: true},
  "joi": { type: Boolean, required: true},
  "vineri": { type: Boolean, required: true},
  "sambata": { type: Boolean, required: true},
  "duminica": { type: Boolean, required: true},
});

module.exports = mongoose.model('PlannedRouteSchema', PlannedRouteSchema);