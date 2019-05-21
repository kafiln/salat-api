const router = require('express').Router();
const prayers = require('../data/prayers.json');

router.use('/names', (req, res) => {
  return res.status(200).json(prayers.map(e => e.name));
});

module.exports = router;
