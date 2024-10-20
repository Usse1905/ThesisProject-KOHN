// const { where } = require("sequelize")
const projectdb = require("../database/indexDb.js")
const Companies = require("../Model/ModelCompanies.js")

module.exports={

getAllCompany : async(req,res)=>{
    try{
        
        const allCompanies=await projectdb.Companies.findAll({})
        res.status(200).send(allCompanies)
    }
    catch(error){
        res.status(500).send(error)
    }
},

getOneCompany : async(req,res)=>{
    try{
        const id=req.params.id
        const getOne=await projectdb.Companies.findOne({where:{id}})
        console.log(getOne);
        
        res.status(200).send(getOne)
    }
    catch(error){
        res.status(500).send(error)
    }
},

addCompany : async(req,res)=>{
    try{
        const body=req.body
        console.log(body);
        const newCompanie=await projectdb.Companies.create(body)
        res.status(200).send(newCompanie)
    }
    catch(error){
        res.status(500).send(error)
    }
},

updateCompany : async(req,res)=>{
try{
    const body=req.body
    const id=req.params.id
    const updateComp=projectdb.Companies.update(body,{
        where:{id}
    })
    const getOneCamp=await projectdb.Companies.findOne({where:{id}})
    res.status(200).send(getOneCamp)
}
    catch(error){
        res.status(500).send(error)
    }
},
deleteCompany : async(req,res)=>{
    try{
        const id=req.params.id
        getOne=await projectdb.Companies.findOne({where:{id}})
        const deleteOne=await DB.Companies.destroy({where:{id}})
        res.status(200).send(getOne)
    }
    catch(error){
        res.status(500).send(error)
    }
},

approveCompany : async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const company = await Companies.findByPk(companyId);
      
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
      const companies = await Companies.findAll({ where: { isApproved: false } });
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching unapproved companies', error });
    }
  },
}












