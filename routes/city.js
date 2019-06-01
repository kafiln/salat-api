const router = require('express').Router();
const City = require('../models/City');
const langs = ['fr', 'ar'];

const toDto = lang => city => ({
  name: city.names[lang],
  id: city._id
});

// Search by Id
router.get('/:id', async (req, res) => {
  //TODO: Extract this logic into a middlewear
  if (req.query.lang && !langs.includes(req.query.lang)) {
    return res.status(400).json({
      error: `The language ${
        req.query.lang
      } is not supported, The supported languages are: ${langs.join(',')}`
    });
  } else {
    req.lang = req.query.lang ? req.query.lang : 'fr';
  }

  const { lang } = req;
  const { id } = req.params;
  if (!parseInt(id)) {
    return res.status(400).json({ error: `Id should be a number` });
  }
  const city = await City.findOne({ _id: +id });
  if (!city) {
    return res
      .status(404)
      .json({ error: `Id not found, no city with the given Id` });
  }
  return res.status(200).json(toDto(lang)(city));
});

// Gets all the cities
router.get('/', async (req, res) => {
  //TODO: Extract this logic into a middlewear
  if (req.query.lang && !langs.includes(req.query.lang)) {
    return res.status(400).json({
      error: `The language ${
        req.query.lang
      } is not supported, The supported languages are: ${langs.join(',')}`
    });
  } else {
    req.lang = req.query.lang ? req.query.lang : 'fr';
  }

  const { lang } = req;
  const filterQuery = {};

  if (req.query.name) {
    filterQuery['names.' + lang] = {
      $regex: '.*' + req.query.name + '.*',
      $options: 'i'
    };
  }
  const cities = await City.find(filterQuery);
  if (!cities.length) {
    return res.status(404).json({
      error: `No city found with the name ${
        req.query.name
      } and language ${lang}`
    });
  }
  res.status(200).send(cities.map(toDto(lang)));
});

module.exports = router;
