const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Auth
router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.json({ message: 'Login successful', user: req.user });
    }
);

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router;
