const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: "../.env"}); // Load environment variables from .env file

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const tokenHeaderKey = "Authorization";

function authenticateJWT(req, res, next) {
  const token = req.header(tokenHeaderKey);
    console.log('Decoded JWT:', token); // Log thông tin đã giải mã

  if (!token) return res.status(403).json({ message: 'Token not provided' });

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    console.log('Decoded JWT:', decoded); // Log thông tin đã giải mã
    req.user = decoded; // Gắn user info vào req
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateJWT;
