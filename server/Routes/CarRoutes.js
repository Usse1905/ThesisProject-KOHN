const express = require('express')
const router = express.Router()
const {getCars,getOneCar} = require("../Controller/CarController")
router.get('/allcars',getCars)
router.get('/one/:id',getOneCar)

module.exports=router