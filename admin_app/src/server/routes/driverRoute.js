const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driver_controller');

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
