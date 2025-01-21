const express = require('express');
const passport = require('passport');
const router = express.Router();

// google auth: GET /auth/login
router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// login: GET /auth/user
router.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ message: 'Login successful', user: req.user });
        // res.json(req.user);
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

// login: GET /auth/login
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: process.env.FRONTEND_DOMAIN + '/login' }), // TODO: redirect to error page (frontend)
    (req, res) => {
        // res.redirect(process.env.FRONTEND_DOMAIN); // TODO: should redirect to success/home page (frontend)
        res.redirect("/posts"); // NOTE: temporary (should make a get request to /post)
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
