
const projectdb = require("../database/indexDb.js");

module.exports = {
    getAllReq : async (req, res) => {
        try {
            const userequest = await projectdb.UserRequests.findAll()
            res.status(200).send(userequest)
        }
        catch (error) {
          console.error("Error fetching user requests:", error)
            res.status(500).send({ message: "Internal Server Error", error })
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
    updateReq:async(req,res)=>{
            try{
                const body=req.body
                const id=req.params.id
                const updateRequest=projectdb.UserRequests.update(body,{
                    where:{id}
                })
                const getOneCar=await projectdb.Cars.findOne({where:{id}})
                res.status(200).send(getOneCar)
            }
                catch(error){
                    res.status(500).send(error)
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