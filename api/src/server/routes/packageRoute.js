const express = require('express');
const router = express.Router();

const packageController = require('../controllers/user/package_controller');

router.post('/getPackageByPhone', (req, res) => {
    packageController.getPackageByPhone(req, res);
});

router.post('/getPackageDetail', (req, res) => {
    packageController.getPackageDetail(req, res);
});

module.exports = router;
