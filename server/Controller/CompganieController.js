// const { where } = require("sequelize")
const DB=require("../database/indexDb.js")
const compagnies=require("../Model/compagnies.js")

getAllCompagnie=async(req,res)=>{
    try{
        
        const allCompagnies=await DB.compagnies.findAll({})
        res.status(200).send(allCompagnies)
    }
    catch(error){
        res.status(500).send(error)
    }
}

getOneCompagnie=async(req,res)=>{
    try{
        const id=req.params.id
        const getOne=await DB.compagnies.findOne({where:{id}})
        console.log(getOne);
        
        res.status(200).send(getOne)
    }
    catch(error){
        res.status(500).send(error)
    }
}

addCompagnie=async(req,res)=>{
    try{
        const body=req.body
        console.log(body);
        const newCompagnie=await DB.compagnies.create(body)
        res.status(200).send(newCompagnie)
    }
    catch(error){
        res.status(500).send(error)
    }
}

updateCompagnie=async(req,res)=>{
try{
    const body=req.body
    const id=req.params.id
    const updateComp=DB.compagnies.update(body,{
        where:{id}
    })
    const getOneCamp=await DB.compagnies.findOne({where:{id}})
    res.status(200).send(getOneCamp)
}
    catch(error){
        res.status(500).send(error)
    }
}
deleteCompagnie=async(req,res)=>{
    try{
        const id=req.params.id
        getOne=await DB.compagnies.findOne({where:{id}})
        const deleteOne=await DB.compagnies.destroy({where:{id}})
        res.status(200).send(getOne)
    }
    catch(error){
        res.status(500).send(error)
    }
}

module.exports={getAllCompagnie,getOneCompagnie,addCompagnie,updateCompagnie,deleteCompagnie}










