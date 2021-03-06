const express = require('express');
const router = express.Router();

const shipmentController = require('../controllers/shipment_controller');

router.post('/getSuggestedShipment', (req, res) => {
    shipmentController.getSuggestedShipment(req, res);
});

router.post('/getShipmentDetail', (req, res) => {
    shipmentController.getShipmentDetail(req, res);
});

router.post('/getShipmentsByDriver', (req, res) => {
    shipmentController.getShipmentsByDriver(req, res);
});

router.post('/createNewShipment', (req, res) => {
    shipmentController.createNewShipment(req, res);
});

module.exports = router;
