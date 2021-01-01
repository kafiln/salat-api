const router = require('express').Router();
const Prayer = require('../models/Prayer');
const { parseDay, timesFromStringtoDate } = require('../utils');
const { validateGetPrayers } = require('../validation/prayer');

const toDto = prayer => {
  let dto = timesFromStringtoDate(prayer);
  dto.day = parseDay(prayer.day, prayer.month);
  dto.id = prayer.city;
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
    prayers = await Prayer.find(filterQuery).select('-_id');
  } catch (ex) {
    return res.status(500).json({ error: ex });
  }
  if (!prayers.length)
    return res.status(400).json({
      error: 'Nothing found, maybe one of your parameters is invalid'
    });

  return res.status(200).json(prayers.map(toDto));
});

module.exports = router;
