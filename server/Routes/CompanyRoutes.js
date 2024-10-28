const express = require('express')
const router = express.Router()



const{getAllCompany,getOneCompany,addCompany,updateCompany,deleteCompany}=require("../Controller/CompanyController")


router.get('/getAllCompanies',getAllCompany)
router.get('/getOneCompany/:id',getOneCompany)
router.post('/addCompagny',addCompany)
router.put('/updateCompagny/:id',updateCompany)
router.delete('/deleteCompagny/:id',deleteCompany)


module.exports = router;