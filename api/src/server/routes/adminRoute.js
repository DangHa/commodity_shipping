const express = require('express');
const router = express.Router();


const userController = require('../controllers/user_controller');
const driverController = require('../controllers/driver_controller');
const shipmentController = require('../controllers/shipment_controller');
const BOTController = require('../controllers/bot_controller');



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

// Shipment
router.get('/getAllShipments', (req, res) => {
    shipmentController.getAllShipments(req, res);
});

router.post('/deleteShipment', (req, res) => {
    shipmentController.deleteShipment(req, res);
});

// BOT
router.get('/getAllBOT', (req, res) => {
    BOTController.getAllBOT(req, res);
});

// statistic
router.get('/statistic', (req, res) => {
    shipmentController.statistic(req, res);
});


module.exports = router;
