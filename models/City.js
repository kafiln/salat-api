const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  refId: Number,
  names: {
    fr: String,
    ar: String
  }
});

module.exports = mongoose.model('City', citySchema);
