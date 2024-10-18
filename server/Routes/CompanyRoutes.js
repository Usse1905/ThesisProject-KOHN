const express = require('express')
const router = express.Router()
// const authMiddleware = require('../middleware/authMiddleware');
// const adminMiddleware = require('../middleware/adminMiddleware');

const{getAllCompany,getOneCompany,addCompany,updateCompany,deleteCompany,approveCompany,getUnapprovedCompanies}=require("../Controller/CompanyController")


router.get('/getAllCompanies',getAllCompany)
router.get('/getOneCompany/:id',getOneCompany)
router.post('/addCompagny',addCompany)
// router.post('/approve/:companyId', authMiddleware, adminMiddleware, approveCompany);
// router.get('/unapproved', authMiddleware, adminMiddleware, getUnapprovedCompanies);
router.put('/updateCompagny/:id',updateCompany)
router.delete('/deleteCompagny/:id',deleteCompany)

module.exports = router;