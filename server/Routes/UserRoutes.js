const express = require('express')
const {signup,login,updateUser}=require('../Controller/UserController.js')
const router = express.Router()




router.post('/signup',signup)
router.post('/login',login)
router.put('/updateuser/:id',updateUser)


module.exports=router