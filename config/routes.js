const express = require('express');
const router  = express.Router();

const photosController = require('../controllers/photos');
const staticsController = require('../controllers/statics');

router.route('/')
  .get(staticsController.home);

router.route('/map')
  .get(photosController.index);

module.exports = router;
