const express = require('express');
const router = express.Router();
const companyController = require('../Controller/CompanyController');
//const authMiddleware = require('../middleware/authMiddleware');
//const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/unapproved', authMiddleware, adminMiddleware, companyController.getUnapprovedCompanies);
router.post('/approve/:companyId', authMiddleware, adminMiddleware, companyController.approveCompany);

module.exports = router;