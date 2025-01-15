const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');

// GET: /test/user-id
router.get('/user-id', ensureAuthenticated, (req, res) => {
    res.json({ userId: req.user._id });
});

module.exports = router;
