const express = require('express')
const router = express.Router()
const{verifyToken,adminMiddleware}=require("../Controller/Auth")
const{approveCompany,getUnapprovedCompanies,deleteCar,markNotificationsAsSeen}=require("../Controller/AdminController")
const {adminSignIn}=require('../Controller/UserController.js')




router.post('/approve/:companyId',verifyToken,adminMiddleware, approveCompany);
router.get('/unapproved', verifyToken,adminMiddleware, getUnapprovedCompanies);
router.delete('/car:carId', verifyToken,adminMiddleware, deleteCar);
router.post('/signin', adminSignIn);
router.post('/notifications', markNotificationsAsSeen);


module.exports = router;