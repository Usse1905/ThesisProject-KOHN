const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract the token from the 'Bearer <token>' format
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' }); // Use status code 401 for unauthorized access
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded, "Decoded Token"); // Better log message for debugging
    
    req.user = decoded; // Save the decoded user info to request object
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Token verification failed:', error); // Log the error for better debugging
    res.status(403).json({ error: 'Invalid token' }); // Use status code 403 for forbidden access
  }
}

const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') { // Check if req.user is defined
    next(); // User is admin, proceed to the next middleware
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' }); // Use status code 403
  }
};

module.exports = { verifyToken, adminMiddleware };
