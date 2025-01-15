const express = require('express');
const passport = require('passport');
const router = express.Router();

// google auth: GET /auth/login
router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// login: GET /auth/login
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.status(200).json({ message: 'Login successful', user: req.user });
        // res.redirect(process.env.FRONTEND_DOMAIN);
    }
);

// logout: GET /auth/logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.status(200).json({ message: 'Logged out successfully' });
        // res.redirect(process.env.FRONTEND_DOMAIN);
    });
});

module.exports = router;
