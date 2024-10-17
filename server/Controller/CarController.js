const DB=require("../database/indexDb.js")
const compagnies=require("../Model/Cars.js")

getAllCar=async(req,res)=>{
    try{
        
        const allCars=await DB.Cars.findAll({})
        res.status(200).send(allCars)
    }
    catch(error){
        res.status(500).send(error)
    }
}

getOneCar=async(req,res)=>{
    try{
        const id=req.params.id
        const getOneCar=await DB.Cars.findOne({where:{id}})
        console.log(getOneCar);
        
        res.status(200).send(getOneCar)
    }
    catch(error){
        res.status(500).send(error)
    }
}

addCar=async(req,res)=>{
    try{
        const body=req.body
        console.log(body);
        const newCar=await DB.Cars.create(body)
        res.status(200).send(newCar)
    }
    catch(error){
        res.status(500).send(error)
    }
}

updateCar=async(req,res)=>{
try{
    const body=req.body
    const id=req.params.id
    const updateCar=DB.Cars.update(body,{
        where:{id}
    })
    const getOneCar=await DB.Cars.findOne({where:{id}})
    res.status(200).send(getOneCar)
}
    catch(error){
        res.status(500).send(error)
    }
}
deleteCar=async(req,res)=>{
    try{
        const id=req.params.id
        getOneCar=await DB.Cars.findOne({where:{id}})
        const deleteOneCar=await DB.Cars.destroy({where:{id}})
        res.status(200).send(getOneCar)
    }
    catch(error){
        res.status(500).send(error)
    }
}

module.exports={getAllCar,getOneCar,addCar,updateCar,deleteCar}
