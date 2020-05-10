const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prayerSchema = new Schema({
  '_id': String,
  fajr: String,
  chorouq: String,
  dhuhr: String,
  asr: String,
  maghrib: String,
  ishae: String,
  day: Number,
  month: Number,
  cityId: {
    type: Number,
    ref: 'City'
  }
});

module.exports = mongoose.model('Prayer', prayerSchema);
