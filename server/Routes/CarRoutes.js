const express = require('express');
const router = express.Router();
const{getCars,getOneCar,addCar,updateCar,deleteCar,getCompanyCars}=require("../Controller/CarController.js")



router.get('/allcars',getCars)
router.get('/one/:id',getOneCar)
router.get('/companycars/:id',getCompanyCars)
router.post('/addCar',addCar)
router.put('/updateCar/:id',updateCar)
router.delete('/deleteCar/:id',deleteCar)

module.exports=router

