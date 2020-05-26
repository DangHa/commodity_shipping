const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/getAllUsers', (req, res) => {
  userController.getAllUsers(req, res);
});

// router.post('/getInfoUser', (req, res) => {
//   userController.getInfoUser(req, res);
// });

// router.post('/updateInforUser', (req, res) => {
//   userController.updateInforUser(req, res);
// });

// router.post('/login', (req, res) => {
//   userController.login(req, res);
// });

// router.post('/signup', (req, res) => {
//   userController.signup(req, res);
// });

module.exports = router;
