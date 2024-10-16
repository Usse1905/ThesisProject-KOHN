
const { Company } = require('../Model/ModelCompanies');

exports.getUnapprovedCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({ where: { isApproved: false } });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching unapproved companies', error });
  }
};

exports.approveCompany = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const company = await Company.findByPk(companyId);
    
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.isApproved = true;
    await company.save();
    res.json({ message: 'Company approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving company', error });
  }
};
