const express = require('express');
const router = express.Router();

const shipmentController = require('../controllers/shipment_controller');

router.get('/getAllShipments', (req, res) => {
    shipmentController.getAllShipments(req, res);
});

router.post('/deleteShipment', (req, res) => {
    shipmentController.deleteShipment(req, res);
});
  

module.exports = router;
