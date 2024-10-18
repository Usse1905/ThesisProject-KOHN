
// controllers/carController.js
const { Cars } = require('../Model/ModelCars');
const projectdb = require("../database/indexDb.js")

exports.deleteCar = async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Cars.findByPk(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await car.destroy();
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting car', error });
  }
};

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
        }
}

