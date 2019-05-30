const router = require('express').Router();
const Prayer = require('../models/Prayer');

router.use('/:cityId?/:month?/:day?', async (req, res) => {
  const filterQuery = {};

  Object.keys(req.query).forEach(key => {
    if (req.query[key]) {
      filterQuery[key] = req.query[key];
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
      error: 'Nothing found, one of your parameters is invalid'
    });

  return res.status(200).json(prayers);
});

module.exports = router;
