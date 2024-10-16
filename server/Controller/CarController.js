// controllers/carController.js
const { Cars } = require('../Model/ModelCars');

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
