const express = require('express');
const router = express.Router();

const routeController = require('../controllers/routeController');

router.post('/getFeeAndBOTPassed', (req, res) => {
    routeController.getFeeAndBOTPassed(req, res);
});

module.exports = router;
