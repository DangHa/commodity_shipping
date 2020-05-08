const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driver_controller');

router.post('/getInfoDriver', (req, res) => {
    driverController.getInfoUser(req, res);
});

router.post('/updateInforDriver', (req, res) => {
    driverController.updateInforUser(req, res);
});

router.post('/login', (req, res) => {
    driverController.login(req, res);
});

router.post('/signup', (req, res) => {
    driverController.signup(req, res);
});

module.exports = router;
