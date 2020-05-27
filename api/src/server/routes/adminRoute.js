const express = require('express');
const router = express.Router();


const userController = require('../controllers/user_controller');


// User
router.get('/getAllUsers', (req, res) => {
    userController.getAllUsers(req, res);
});

router.post('/updateInforUser', (req, res) => {
    userController.updateInforUser(req, res);
});

router.post('/deleteUser', (req, res) => {
    userController.deleteUser(req, res);
});

module.exports = router;
