const City = require('../models/City');

const validateGetPrayers = async query => {
  const numberKeys = ['city', 'month', 'day'];
  errors = {};

  numberKeys.forEach(key => {
    if (query[key] && !parseInt(query[key])) {
      errors[key] = `${key} should be a valid number`;
    }
  });

  if (query.month && (query.month > 12 || query.month < 0)) {
    isValid = false;
    errors['month'] = 'Month should be in [1,12] range';
  }

  if (query.day && (query.day > 31 || query.day < 0)) {
    isValid = false;
    errors['day'] = 'day should be in [1,31] range';
  }

  if (query.city) {
    const city = await City.findOne({ _id: +query.city });
    if (!city) {
      isValid = false;
      errors['city'] = 'The city does not exist';
    }
  }

  //TODO: Add a validation when the date is not a valid date
  // if(query.month && query.day){

  // }
  return {
    isValid: Object.keys(errors).length == 0,
    errors
  };
};

module.exports = {
  validateGetPrayers
};
