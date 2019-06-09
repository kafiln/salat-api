const router = require('express').Router();
const Prayer = require('../models/Prayer');
const { parseDay, timesFromStringtoDate } = require('../utils');
const { validateGetPrayers } = require('../validation/prayer');

const toDto = lang => prayer => {
  let dto = timesFromStringtoDate(prayer);
  // delete dto.cityId;
  //TODO: Handle format change
  dto.day = parseDay(prayer.day, prayer.month);
  dto.id = prayer.cityId._id;
  dto.city = prayer.cityId.names[lang];
  return dto;
};
router.use('/', async (req, res) => {
  const { isValid, errors } = await validateGetPrayers(req.query);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const filterQuery = {};

  Object.keys(req.query).forEach(key => {
    if (req.query[key]) {
      filterQuery[key] = +req.query[key];
    }
  });

  let prayers;
  try {
    prayers = await Prayer.find(filterQuery)
      .select('-_id')
      .populate('cityId');
  } catch (ex) {
    return res.status(500).json({ error: ex });
  }
  if (!prayers.length)
    return res.status(400).json({
      error: 'Nothing found, one of your parameters is invalid'
    });

  return res.status(200).json(prayers.map(toDto(req.lang)));
});

module.exports = router;
