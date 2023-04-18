const jwt = require('jsonwebtoken');

// Set token expiration time in seconds
const tokenExpirationTime = 3600; // 1 hour

// Generate JWT token with expiration time
const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: tokenExpirationTime,
    }
  );
  return token;
};

// Verify JWT token and check expiration
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.exp < Date.now() / 1000) {
      // Token has expired
      return null;
    }
    return decoded;
  } catch (err) {
    // Token verification failed
    return null;
  }
};
