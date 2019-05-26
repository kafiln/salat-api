const router = require('express').Router();
const cities = require('../data/cities.json');
const { getPrayers } = require('../utils');

router.use('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(404).json({ error: 'Id should be a number' });
  }

  if (!cities.some(c => c.id == id)) {
    return res.status(404).json({ error: 'City not found' });
  }

  let prayers;
  try {
    prayers = await getPrayers();
  } catch (ex) {
    console.log(ex);
    return res.status(404).json({ error: 'Not found' });
  }

  if (!prayers) {
    return res.status(404).json({ error: 'Not found' });
  }

  const result = prayers.filter(p => p.id === id);

  if (!result || result.length == 0) {
    return res.status(404).json({ error: 'Id not found' });
  }

  return res.status(200).json(result[0]);
});

router.use('/', async (req, res) => {
  const prayers = await getPrayers();
  if (!prayers) {
    return res.status(404).json({ error: 'Not found' });
  }
  return res.status(200).json(prayers);
});

module.exports = router;
