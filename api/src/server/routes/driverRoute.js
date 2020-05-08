const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.post('/getInfoDriver', (req, res) => {
  userController.getInfoUser(req, res);
});

router.post('/updateInforDriver', (req, res) => {
  userController.updateInforUser(req, res);
});

router.post('/login', (req, res) => {
  userController.login(req, res);
});

router.post('/signup', (req, res) => {
  userController.signup(req, res);
});

module.exports = router;
