// controllers/carController.js
// const  Cars  = require('../Model/ModelCars.js');
const projectdb = require("../database/indexDb.js")

module.exports={
    getCars: async (req, res) => {
        try {
            const car = await projectdb.Cars.findAll()
            res.status(200).send(car)
        }
        catch (error) {
          console.error("Error fetching cars:", error)
            res.status(500).send({ message: "Internal Server Error", error })
        }
    },
    getOneCar : async(req, res) => {
        try{
          const carId = req.params.id
          const car = await projectdb.Cars.findOne({where:{id:carId}})
          if (!car) {
            return res.status(404).send({ message: "Car not found" });
        }
          res.status(200).send(car)
        }
          catch(error){
            console.error("Error fetching car:", error)
            res.status(500).send({ message: "Internal Server Error", error })
          }
        },
  addCar:async(req,res)=>{
    try{
        const body=req.body
        console.log(body);
        const newCar=await projectdb.Cars.create(body)
        res.status(200).send(newCar)
    }
    catch(error){
        res.status(500).send(error)
    }
},
  updateCar:async(req,res)=>{
try{
    const body=req.body
    const id=req.params.id
    const updateCar=projectdb.Cars.update(body,{
        where:{id}
    })
    const getOneCar=await projectdb.Cars.findOne({where:{id}})
    res.status(200).send(getOneCar)
}
    catch(error){
        res.status(500).send(error)
    }
},

deleteCar : async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await projectdb.Cars.findByPk(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await car.destroy();
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car', error });
  }
}
}


