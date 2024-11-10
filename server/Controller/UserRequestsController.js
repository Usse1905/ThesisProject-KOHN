const { emitNotification } = require("../SocketManager.js");
const { where } = require("sequelize");
const projectdb = require("../database/indexDb.js");
const Users = require("../Model/ModelUsers.js")
const Companies = require("../Model/ModelCompanies.js")
const UserRequests = require("../Model/ModelUserRequests.js")


module.exports = {
    getAllReq : async (req, res) => {
        try {
            const userequest = await projectdb.UserRequests.findAll({})
            res.status(200).send(userequest)
        }
        catch (error) {
          console.error("Error fetching user requests:", error)
            res.status(500).send({ message: "Internal Server Error", error })
        }
    },
    getUserReqs: async (req, res) => {
      try {
          const id = req.params.id;
          const userequest = await projectdb.UserRequests.findAll({
              where: { userId: id },
              include: [
                  { model: projectdb.Users, as: 'User' },
                  { model: projectdb.Companies, as: 'Company' }
              ]
          });
          res.status(200).send(userequest);
      } catch (error) {
          console.error("Error fetching user requests:", error);
          res.status(500).send({ message: "Internal Server Error", error: error.message });
      }
  },

  getCompanyReqs: async (req, res) => {
    try {
        const id = req.params.id;
        const companyequest = await projectdb.UserRequests.findAll({
            where: { companyId: id },
            include: [
                { model: projectdb.Users, as: 'User' },
                { model: projectdb.Companies, as: 'Company' }
            ]
        });
        res.status(200).send(companyequest);
    } catch (error) {
        console.error("Error fetching user requests:", error);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
},
  
    getOnereq : async(req, res) => {
        try{
          const requestId = req.params.id
          const userequest = await projectdb.UserRequests.findOne({where:{id:requestId}})
          if (!userequest) {
            return res.status(404).send({ message: "user request not found" });
        }
          res.status(200).send(userequest)
        }
          catch(error){
            console.error("Error fetching user request:", error)
            res.status(500).send({ message: "Internal Server Error", error })
          }
        },
    addRequest:async(req,res)=>{
            try{
                const body=req.body
                console.log(body);
                const newuserReq=await projectdb.UserRequests.create(body)
                res.status(200).send(newuserReq)
            }
            catch(error){
                res.status(500).send(error)
            }
        },
        
        updateReq: async (req, res) => {
          try {
            const body = req.body;
            const id = req.params.id;
        
            const previousRequest = await projectdb.UserRequests.findByPk(id);
            console.log("previous request is ", previousRequest);
        
            // Update the request
            const [updatedRows] = await projectdb.UserRequests.update(body, {
              where: { id },
              include: [
                { model: projectdb.Users, as: 'User' },
                { model: projectdb.Companies, as: 'Company' }
              ]
            });
        
            console.log("these are update rows", updatedRows);
        
            if (updatedRows === 0) {
              return res.status(404).json({ message: "Request Not Found!" });
            }
        
            // Check if there is a status change
            if (previousRequest && previousRequest.status !== body.status) {
              previousRequest.statusHistory = previousRequest.statusHistory || [];
              previousRequest.statusHistory.push({
                  oldStatus: previousRequest.status,
                  newStatus: body.status,
                  changedAt: new Date(),
              });
        
              // Update the request with the new status history
              await previousRequest.save(); // This should persist the changes to the DB
              await projectdb.UserRequests.update(
                { statusHistory: previousRequest.statusHistory },
                { where: { id },
                include: [
                  { model: projectdb.Users, as: 'User' },
                  { model: projectdb.Companies, as: 'Company' }
              ] }
            );
            console.log("Status history saved successfully.");

              // Emit the notification to the user using socketManager
              const userId = previousRequest.userId;
              console.log("Emitting notification for user:", userId);
              emitNotification(userId, 1); // Send the count of status history
            } else {
              console.log("No status change detected.");
            }
        
            // Retrieve the updated request and send it as the response
            const updatedRequest = await projectdb.UserRequests.findOne({ where: { id } });
            console.log("Updated request:", updatedRequest);
        
            res.status(200).json(updatedRequest);
          } catch (error) {
            console.error('Error updating request:', error.message);
            res.status(500).send(error.message);
          }
        },
        deleteReq : async (req, res) => {
              try {
                const reqId = req.params.id;
                const userequest = await projectdb.UserRequests.findByPk(reqId);
            
                if (!userequest) {
                  return res.status(404).json({ message: 'request not found' });
                }
            
                await userequest.destroy();
                res.json({ message: 'Request deleted successfully' });
              } catch (error) {
                res.status(500).json({ message: 'Error deleting request', error });
              }
            }
}