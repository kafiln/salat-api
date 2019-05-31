const router = require('express').Router();
const city = require('./city');
const prayer = require('./prayer');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

router.use('/city', city);
router.use('/prayer', prayer);

// Fall back to swagger doc
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
