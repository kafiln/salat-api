const router = require('express').Router();
const cities = require('../data/cities.json');
const Prayer = require('../models/Prayer');
// const { getPrayers } = require('../utils');

router.use('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(404).json({ error: 'Id should be a number' });
  }

  let prayers;
  try {
    prayers = await Prayer.find({ id: id });
  } catch (ex) {
    console.log(ex);
    return res.status(404).json({ error: 'Not found' });
  }

  return res.status(200).json(prayers);
});

router.use('/', async (req, res) => {
  const prayers = await Prayer.find({});
  if (!prayers) {
    return res.status(404).json({ error: 'Not found' });
  }
  return res.status(200).json(prayers);
});

module.exports = router;
