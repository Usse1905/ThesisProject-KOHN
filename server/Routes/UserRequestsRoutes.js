const express = require('express')
const router = express.Router()

const{getAllReq,getOnereq,addRequest,updateReq,deleteReq}=require("../Controller/UserRequestsController")

router.get("/allrequests",getAllReq)
router.get("/onerequest",getOnereq)
router.post("/addrequest",addRequest)
router.put("/updaterequest",updateReq)
router.delete("/deleterequest",deleteReq)

module.exports = router;
