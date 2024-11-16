import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// NOTE: needs JWT token in the request headers
export const authorizationMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authentication required.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        // create req.user object
        req.user = {
            id: user._id,
            org_id: user.org_id,
            username: user.username,
            email: user.email
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
