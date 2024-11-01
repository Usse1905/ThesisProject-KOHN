const Users = require('../Model/ModelUsers.js');
const bcrypt = require('bcrypt');
let x = require('dotenv').config();
const jwt = require('jsonwebtoken');
const DB=require("../database/indexDb.js")

module.exports = {

     //Signup

     signupCompany : async (req, res) => {
        const {name, address, phoneNumber, website, email, password, licensesinceWhen, lei } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);

       try {
           const company = await DB.Companies.create({ 
            name,
            address,
            phoneNumber,
            website,
            email,
            password: hashedPassword,
            licensesinceWhen,
            lei,
            });
          res.status(201).json({ message: 'Company created', company });
       } catch (error) {
        console.error(error)
         res.status(400).json({ error: error.message });
       }
     }
    }