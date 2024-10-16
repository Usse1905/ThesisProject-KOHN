const express = require('express');
const router = express.Router();
const carController = require('../Controller/CarController');
//const authMiddleware = require('../middleware/authMiddleware');
//const adminMiddleware = require('../middleware/adminMiddleware');

router.delete('/:carId', authMiddleware, adminMiddleware, carController.deleteCar);

module.exports = router;