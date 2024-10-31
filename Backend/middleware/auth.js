// middleware/auth.js
import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user info to the request object
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};


const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin only.' });
  }
};

export { auth, adminAuth };