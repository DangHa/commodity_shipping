const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driver_controller');

router.post('/getInfoDriver', (req, res) => {
    driverController.getInfoDriver(req, res);
});

router.post('/updateInforDriver', (req, res) => {
    driverController.updateInforDriver(req, res);
});

router.post('/login', (req, res) => {
    driverController.login(req, res);
});

router.post('/signup', (req, res) => {
    driverController.signup(req, res);
});

module.exports = router;
