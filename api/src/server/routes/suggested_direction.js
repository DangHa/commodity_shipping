const express = require('express');
const router = express.Router();

const suggestedDirection = require('../controllers/suggested_direction');

router.post('/getSuggestedDirection', (req, res) => {
    suggestedDirection.getSuggestedDirection(req, res);
});

module.exports = router;
