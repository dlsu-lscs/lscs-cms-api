const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET /users
// - gets all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// TODO: GetUserInfoById (or GetUserInfoByEmail ?)

module.exports = router;
