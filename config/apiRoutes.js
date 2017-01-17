const express = require('express');
const router  = express.Router();

const photosController = require('../controllers/photos');
const authenticationsController = require('../controllers/authentications');

router.route('/register')
  .post(authenticationsController.register);
router.route('/login')
  .post(authenticationsController.login);

router.route('/photos')
  .get(photosController.index);





module.exports = router;
