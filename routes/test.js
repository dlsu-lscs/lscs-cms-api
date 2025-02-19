const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');
const cookie = require('express-session/session/cookie');

// GET: /test/user-id
router.get('/user-id', ensureAuthenticated, (req, res) => {
    res.status(200).json({ userId: req.user._id });
});

module.exports = router;
