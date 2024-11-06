const express = require('express')
const router = express.Router()

const{getAllReq,getOnereq,addRequest,updateReq,deleteReq,getUserReqs}=require("../Controller/UserRequestsController")

router.get("/allrequests",getAllReq)
router.get("/onerequest",getOnereq)
router.get("/oneuserreqs/:id",getUserReqs)
router.post("/addrequest",addRequest)
router.put("/updaterequest/:id",updateReq)
router.delete("/deleterequest",deleteReq)

module.exports = router;
