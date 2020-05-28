const express = require('express');
const router = express.Router();

const statistic = require('../controllers/statistic');

router.get('/statistic', (req, res) => {
    statistic.statistic(req, res);
});

module.exports = router;
