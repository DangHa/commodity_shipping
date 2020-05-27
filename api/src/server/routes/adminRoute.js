const express = require('express');
const router = express.Router();


const userController = require('../controllers/user_controller');
const driverController = require('../controllers/driver_controller');



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

// Driver
router.get('/getAllDrivers', (req, res) => {
    driverController.getAllDrivers(req, res);
});

router.post('/updateInforDriver', (req, res) => {
    driverController.updateInforDriver(req, res);
});

router.post('/deleteDriver', (req, res) => {
    driverController.deleteDriver(req, res);
});


module.exports = router;
