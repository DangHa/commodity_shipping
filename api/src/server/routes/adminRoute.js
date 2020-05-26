const express = require('express');
const router = express.Router();


const userController = require('../controllers/user_controller');


// User
router.get('/getAllUsers', (req, res) => {
    console.log(" admin enter ..............")
    userController.getAllUsers(req, res);
});

module.exports = router;
