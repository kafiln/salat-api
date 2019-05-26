const router = require('express').Router();
const cities = require('../data/cities.json');
const db = require('../utils').initDb();

router.use('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(404).json({ error: 'Id should be a number' });
  }

  if (!cities.some(c => c.id == id)) {
    return res.status(404).json({ error: 'Id not found' });
  }
  const prayer = db
    .get('prayers')
    .find({ id })
    .value();

  if (!prayer) {
    return res.status(404).json({ error: 'Id not found' });
  }
  return res.status(200).json(prayer);
});

router.use('/', (req, res) => {
  const prayers = db.get('prayers').value();
  if (!prayers) {
    return res.status(404).json({ error: 'not found' });
  }
  return res.status(200).json(prayers);
});

module.exports = router;
