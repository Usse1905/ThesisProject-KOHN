
const express = require('express')
const{getAllCompagnie,getOneCompagnie,addCompagnie,updateCompagnie,deleteCompagnie}=require("../Controller/CompganieController.js")
const router = express.Router()

router.get('/getAllCompagnie',getAllCompagnie)
router.get('/getOneCompagnie/:id',getOneCompagnie)
router.post('/addCompagnie',addCompagnie)
router.put('/updateCompagnie/:id',updateCompagnie)
router.delete('/deleteCompagnie/:id',deleteCompagnie)

module.exports=router