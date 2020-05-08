const express = require('express');
const router = express.Router();

const packageController = require('../controllers/package_controller');

router.post('/createNewPackage', (req, res) => {
    packageController.createNewPackage(req, res);
});

router.post('/getPackageByPhone', (req, res) => {
    packageController.getPackageByPhone(req, res);
});

router.post('/getPackageDetail', (req, res) => {
    packageController.getPackageDetail(req, res);
});

router.post('/getPackageByShipment', (req, res) => {
    packageController.getPackageByShipment(req, res);
});

router.post('/updatePackageStatus', (req, res) => {
    packageController.updatePackageStatus(req, res);
});

module.exports = router;
