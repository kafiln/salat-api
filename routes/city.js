const router = require('express').Router();
const City = require('../models/City');

const toDto = city => ({
  names: city.names,
  id: city.refId
});

// Search by Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const city = await City.findOne({ refId: id });
  if (!city) {
    return res
      .status(404)
      .json({ error: `Id not found, no city with the given Id` });
  }
  return res.status(200).json(toDto(city));
});

// Gets all the cities
router.get('/', async (_req, res) => {
  const cities = await City.find({});
  res.status(200).send(cities.map(toDto));
});

module.exports = router;
