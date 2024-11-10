
//const { request } = require("express");
const Users = require('../Model/ModelUsers.js');
const bcrypt = require('bcryptjs');
let x = require('dotenv').config();
const jwt = require('jsonwebtoken');
// const DB=require("../database/indexDb.js");
const projectdb = require('../database/indexDb.js');


module.exports = {

     //Signup
     signup : async (req, res) => {
        const { userName, password, email,cin,dateOfBirth,dateOfLicense,role } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);

       try {
           const user = await projectdb.Users.create({ userName, password: hashedPassword, email,cin,dateOfBirth,dateOfLicense, joined : new Date(),role });

          res.status(201).json({ message: 'User created', user });
       } catch (error) {
        console.error(error)
         res.status(400).json({ error: error.message });
       }
     },
     //Login
     login : async (req, res) => {
    const { userName, password, role } = req.body;
    if (role === "User"){
      console.log('Before DB query');
         const user = await projectdb.Users.findOne({ where: { userName: userName } });
         console.log('After DB query', user);
         if (!user || !(await bcrypt.compare(password, user.password))) {
         return res.status(401).json({ message: 'Invalid credentials' });
       }

         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
       res.json({ message: 'Login successful', token,user:user });
     }
    
    if (role === "Company"){
      const company = await projectdb.Companies.findOne({ where: { name: userName } })

         if (!company || !(await bcrypt.compare(password, company.password))) {
         return res.status(401).json({ message: 'Invalid credentials' });
       }

         const token = jwt.sign({ id: company.id, role: company.role }, process.env.JWT_SECRET);
       res.json({ message: 'Login successful', token,company:company });
    }
  },



// const { updateCar, deleteCar } = require("./CarController")

getAllUser:async(req,res)=>{
    try{
        const allUsers=await projectdb.Users.findAll({})
        res.status(200). send(allUsers)
    }
    catch(error){res.status(500).send(error)}
},

getOneUser:async(req,res)=>{
    try{
        const id=req.params.id
        getOne=await projectdb.Users.findOne({where:{id}})
        res.status(200).send(getOne)
    }
    catch(error){res.status(500).send(error)
    }
},



 // Admin Sign-In Function
 adminSignIn : async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user with the provided email exists and is an admin
      const user = await projectdb.Users.findOne({ where: { email, role: 'admin' } });

      if (!user) {
          return res.status(404).json({ error: 'Admin not found' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
      }

      // Generate JWT Token
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
      res.status(200).json({
          message: 'Admin login successful',
          token,
      });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
},

updateUser: async (req, res) => {
    try {
      const body = req.body;
      const id = req.params.id;
  
      const [updated] = await projectdb.Users.update(body, {
        where: { id }
      });
  
      if (updated) {
        const updatedUser = await projectdb.Users.findOne({ where: { id } });
        return res.status(200).json(updatedUser);
      }
  
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).send(error.message); 
    }
  }
  

}
