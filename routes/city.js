const router = require('express').Router();
const cities = require('../data/cities');

// Gets all the cities

// Search by Id
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const parsed = parseInt(id);
  if (!parsed) {
    next();
  }
  if (parsed > cities.length) {
    return res
      .status(404)
      .json({ error: `Id not found, no city with the given Id` });
  }
  const city = cities.filter(c => c.id == id)[0];
  return res.status(200).json(city);
});

// Search by name
router.get('/:name', (req, res) => {
  const { name } = req.params;
  const result = cities.filter(c =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );

  if (!result) {
    return res
      .status(404)
      .json({ error: `City ${name} not found in the available city list` });
  }
  return res.status(200).json(result);
});

router.get('/', (_req, res) => {
  res.status(200).send(cities);
});

module.exports = router;
