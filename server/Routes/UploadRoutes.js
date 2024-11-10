const express = require('express');
const multer = require('multer');
const cloudinary = require('../database/CloudinaryConfig.js'); 
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); 

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log('Cloudinary upload result:', result);
        res.json({ url: result.secure_url });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
