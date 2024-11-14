const express = require('express');
const router = express.Router();
const{saveMessage,getMessages}=require("../Controller/MessagesController.js")



router.get('/messages/:roomId',getMessages)
router.post('/addmessage',saveMessage)


module.exports=router