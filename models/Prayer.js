const mongoose = require('mongoose');

const prayerSchema = new mongoose.Schema({
  fajr: String,
  chourouq: String,
  dhuhr: String,
  asr: String,
  maghrib: String,
  ishae: String,
  day: Number,
  month: Number,
  cityId: Number,
  city: String
});

module.exports = mongoose.model('Prayer', prayerSchema);
