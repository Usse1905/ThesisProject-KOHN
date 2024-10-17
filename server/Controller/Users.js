const DB=require("../database/indexDb.js")
const Users=require("../Model/Users")
const { updateCar, deleteCar } = require("./CarController")

getAllUser=async(req,res)=>{
    try{
        const allUsers=await DB.Users.findAll({})
        res.status(200). send(allUsers)
    }
    catch(error){res.status(500).send(error)}
}

getOneUser=async(req,res)=>{
    try{
        const id=req.params.id
        getOne=await DB.Users.findOne({where:{id}})
        res.status(200).send(getOne)
    }
    catch(error){res.status(500).send(error)
    }
}
addUser=async(req,res)=>{
    try{
        const body=req.body
        const addUsers=await DB.create(body)
        res.status(200).send(addUsers)
    }
    catch(error){res.status(500).send(error)
    }
}

updateUser=async(req,res)=>{
    try{
        const id=req.params.id
        const addUsers=await DB.update(body,{where:{id}})
        res.status(200).send(addUsers)
    }
    catch(error){res.status(500).send(error)
    }
}

deleteUser=async(req,res)=>{
    try{
        const id=req.params.id
        getOneUser=await DB.Users.findOne({where:{id}})
        const deleteUs=await DB.destroy({where:{id}})
        res.status(200).send(deleteUs)
    }
    catch(error){res.status(500).send(error)
    }
}