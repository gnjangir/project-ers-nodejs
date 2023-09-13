const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/admin_controller');

// assign the work to the employeess
router.get('/assignWork' , passport.checkAuthentication , adminController.assignWork);

//  view the employee
router.get('/view-employee' , passport.checkAuthentication , adminController.showEmployeeList);

//  set the reviews, 
router.post('/setReviewes' , passport.checkAuthentication , adminController.setReviewrAndReviewe);

//  make new Admin
router.post('/newAdmin' , passport.checkAuthentication , adminController.newAdmin);

//  delete the employee
router.get('/deleteEmployee/:id', passport.checkAuthentication , adminController.deleteEmployee);

//  add the employee
router.get('/add-employee' , passport.checkAuthentication , adminController.addEmployee);

module.exports = router;