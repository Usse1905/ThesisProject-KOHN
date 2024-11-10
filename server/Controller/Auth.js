const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; 
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' }); 
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "Decoded Token"); 
    
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error('Token verification failed:', error); 
    res.status(403).json({ error: 'Invalid token' }); 
  }
}

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') { 
    next(); 
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' }); 
  }
};

module.exports = { verifyToken, adminMiddleware };
