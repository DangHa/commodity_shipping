const express = require('express');

const router = express.Router();

const userController = require('../controllers/user/user_authentication');

router.get('/setDatabase', () => {
  userController.setDatabase();
});

router.get('/users', (req, res) => {
  userController.getUsers(req, res);
});

router.post('/api/login', (req, res) => {
  userController.login(req, res);
});

module.exports = router;
