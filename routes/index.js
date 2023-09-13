const express = require('express'); 
const router = express.Router(); 
const homeController = require('../controllers/home_controller'); 

// It will redirect you to the home page
router.get('/' , homeController.home);

// all the requiest withe the suffix /userr.... require the user file, to compute
router.use('/users' , require('./users'));

// all the request with the suffix /admin .....require the admin file to compute
router.use('/admin' , require('./admin'));

// all the request with the suffix /reviews .... require the admin file to compute
router.use('/reviews', require('./reviews'));

module.exports = router;