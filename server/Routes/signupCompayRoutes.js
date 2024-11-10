const express = require('express')
const {signupCompany} = require('../Controller/signupCompany.js')

const router = express.Router()



router.post('/signupcompany',signupCompany)

module.exports = router;

