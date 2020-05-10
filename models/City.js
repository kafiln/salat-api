const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  _id: Number,
  names: {
    'fr-fr': String,
    'ar-ma': String
  }
});

module.exports = mongoose.model('City', citySchema);
