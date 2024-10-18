const express = require('express');
const router = express.Router();
const carController = require('../Controller/CarController');
const {getCars,getOneCar} = require("../Controller/CarController")
//const authMiddleware = require('../middleware/authMiddleware');
//const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/allcars',getCars)
router.get('/one/:id',getOneCar)
router.delete('/:carId', authMiddleware, adminMiddleware, carController.deleteCar);

module.exports=router

