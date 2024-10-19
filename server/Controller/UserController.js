//const { request } = require("express");
const User = require('../Model/ModelUser.js');
const bcrypt = require('bcrypt');
let x = require('dotenv').config();
const jwt = require('jsonwebtoken');

     //Signup
     exports.signup = async (req, res) => {
        const { username, password, email, role } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);

       try {
           const user = await User.create({ username, password: hashedPassword, email, role });
          res.status(201).json({ message: 'User created', user });
       } catch (error) {
         res.status(400).json({ error: error.message });
       }
     };



     //Login
     exports.login = async (req, res) => {
    const { username, password } = req.body;
         const user = await User.findOne({ where: { username } });

         if (!user || !(await bcrypt.compare(password, user.password))) {
         return res.status(401).json({ message: 'Invalid credentials' });
       }

         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
       res.json({ message: 'Login successful', token });
     };


