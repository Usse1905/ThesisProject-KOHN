const express = require('express')
const {signup,login,updateUser}=require('../Controller/UserController.js')
const router = express.Router()




router.post('/signup',signup)
router.post('/login',(req, res) => {
    console.log('Request Body:', req.body);  // Log the body of the incoming request
    login(req, res);
  })
router.put('/updateuser/:id',updateUser)


module.exports=router