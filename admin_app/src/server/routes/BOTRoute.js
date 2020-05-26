const express = require('express');
const router = express.Router();

const BOTController = require('../controllers/bot_controller');

router.post('/getFeeAndBOTPassed', (req, res) => {
    BOTController.getFeeAndBOTPassed(req, res);
});

module.exports = router;
