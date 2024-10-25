const projectdb = require("../database/indexDb.js")

module.exports={

approveCompany : async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const company = await projectdb.Companies.findByPk(companyId);
      
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
  
      company.isApproved = true;
      await company.save();
      res.json({ message: 'Company approved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error approving company', error });
    }
  },
  

  getUnapprovedCompanies : async (req, res) => {
    try {
      const companies = await projectdb.Companies.findAll({ where: { isApproved: false } });
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching unapproved companies', error });
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
  },


}
