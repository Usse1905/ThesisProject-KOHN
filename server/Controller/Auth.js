const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
const token = req.header('Authorization');
if (!token) return res.json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 console.log(decoded  , "hi");
 
 req.user = decoded;
 next()
 } catch (error) {
 res.json({ error: 'Invalid token' });
 }
 };

 const adminMiddleware = (req, res, next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
  

module.exports = {verifyToken,adminMiddleware};