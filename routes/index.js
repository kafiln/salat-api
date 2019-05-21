const router = require('express').Router();
const city = require('./city');
const prayer = require('./prayer');

router.use('/city', city);
router.use('/prayer', prayer);

//FIXME: Use 404 instead
router.use('/', (_req, res) => {
  res.status(404).json({ erreur: 'Not found' });
});

module.exports = router;
