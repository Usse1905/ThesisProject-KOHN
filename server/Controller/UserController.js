
//const { request } = require("express");
// const Users = require('../Model/ModelUsers.js');
const bcrypt = require('bcrypt');
let x = require('dotenv').config();
const jwt = require('jsonwebtoken');
const DB=require("../database/indexDb.js")

module.exports = {

     //Signup
     signup : async (req, res) => {
        const { userName, password, email, role } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);

       try {
           const user = await DB.Users.create({ userName, password: hashedPassword, email, role });
          res.status(201).json({ message: 'User created', user });
       } catch (error) {
        console.error(error)
         res.status(400).json({ error: error.message });
       }
     },



     //Login
     login : async (req, res) => {
    const { userName, password } = req.body;
         const user = await DB.Users.findOne({ where: { userName: userName } });

         if (!user || !(await bcrypt.compare(password, user.password))) {
         return res.status(401).json({ message: 'Invalid credentials' });
       }

         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
       res.json({ message: 'Login successful', token });
     },



// const { updateCar, deleteCar } = require("./CarController")

getAllUser:async(req,res)=>{
    try{
        const allUsers=await DB.Users.findAll({})
        res.status(200). send(allUsers)
    }
    catch(error){res.status(500).send(error)}
},

getOneUser:async(req,res)=>{
    try{
        const id=req.params.id
        getOne=await DB.Users.findOne({where:{id}})
        res.status(200).send(getOne)
    }
    catch(error){res.status(500).send(error)
    }
},
addUser:async(req,res)=>{
    try{
        const body=req.body
        const addUsers=await DB.create(body)
        res.status(200).send(addUsers)
    }
    catch(error){res.status(500).send(error)
    }
},

updateUser:async(req,res)=>{
    try{
        const id=req.params.id
        const addUsers=await DB.update(body,{where:{id}})
        res.status(200).send(addUsers)
    }
    catch(error){res.status(500).send(error)
    }
},

deleteUser:async(req,res)=>{
    try{
        const id=req.params.id
        getOneUser=await DB.Users.findOne({where:{id}})
        const deleteUs=await DB.destroy({where:{id}})
        res.status(200).send(deleteUs)
    }
    catch(error){res.status(500).send(error)
    }
}
}
