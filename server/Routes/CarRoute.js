const express = require('express')
const{getAllCar,getOneCar,addCar,updateCar,deleteCar}=require("../Controller/CarController.js")
const router = express.Router()

router.get('/getAllCar',getAllCar)
router.get('/getOneCar/:id',getOneCar)
router.post('/addCar',addCar)
router.put('/updateCar/:id',updateCar)
router.delete('/deleteCar/:id',deleteCar)

module.exports=router