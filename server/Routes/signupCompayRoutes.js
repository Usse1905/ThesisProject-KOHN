const express = require('express')
const {signUp} = require('../Controller/signupCompany.js')
const router = express.Router()




router.post('/signupcompany',signUp)

module.exports=router