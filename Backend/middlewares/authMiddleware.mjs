// middlewares/authMiddleware.mjs
import jwt from 'jsonwebtoken';



export const protect = (req, res, next) => {
  const token = req.cookies.token; // ✅ Read from cookies

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach decoded user to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
