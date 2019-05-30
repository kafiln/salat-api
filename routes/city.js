const router = require('express').Router();
const City = require('../models/City');
const langs = ['fr', 'ar'];

const toDto = city => ({
  names: city.names,
  id: city.refId
});

// Search by Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!parseInt(id)) {
    return res.status(400).json({ error: `Id should be a number` });
  }
  const city = await City.findOne({ refId: id });
  if (!city) {
    return res
      .status(404)
      .json({ error: `Id not found, no city with the given Id` });
  }
  return res.status(200).json(toDto(city));
});

// Gets all the cities
router.get('/', async (req, res) => {
  if (req.query.lang && !langs.includes(req.query.lang)) {
    return res.status(400).json({
      error: `The language ${
        req.query.lang
      } is not supported, The supported languages are: ${langs.join(',')}`
    });
  }
  const filterQuery = {};
  const lang = req.query.lang ? req.query.lang : 'fr';
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
  res.status(200).send(cities.map(toDto));
});

module.exports = router;
