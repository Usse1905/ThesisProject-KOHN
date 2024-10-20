const express = require('express');
const router = express.Router();
const{getCars,getOneCar,addCar,updateCar,deleteCar}=require("../Controller/CarController.js")

// const authMiddleware = require('../middleware/authMiddleware');
// const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/allcars',getCars)
router.get('/one/:id',getOneCar)
// router.delete('/:carId', authMiddleware, adminMiddleware, deleteCar);
router.post('/addCar',addCar)
router.put('/updateCar/:id',updateCar)
router.delete('/deleteCar/:id',deleteCar)

module.exports=router

