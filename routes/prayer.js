const router = require('express').Router();
const Prayer = require('../models/Prayer');
const { parseDay, parseDateTime } = require('../utils');

const toDto = lang => prayer => {
  let dto = {};
  dto.fajr = parseDateTime(prayer.fajr, prayer.day, prayer.month);
  dto.chorouq = parseDateTime(prayer.chorouq, prayer.day, prayer.month);
  dto.dhuhr = parseDateTime(prayer.dhuhr, prayer.day, prayer.month);
  dto.asr = parseDateTime(prayer.asr, prayer.day, prayer.month);
  dto.maghrib = parseDateTime(prayer.maghrib, prayer.day, prayer.month);
  dto.ishae = parseDateTime(prayer.ishae, prayer.day, prayer.month);
  dto.day = parseDay(prayer.day, prayer.month);
  dto.city = prayer.cityId.names[lang];
  return dto;
};
router.use('/:cityId?/:month?/:day?', async (req, res) => {
  const filterQuery = {};

  Object.keys(req.query).forEach(key => {
    if (req.query[key]) {
      if (!parseInt(req.query[key]))
        return res
          .status(400)
          .json({ error: `${key} should be a valid number` });
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
