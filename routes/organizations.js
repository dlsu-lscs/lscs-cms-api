const express = require('express');
const Organization = require('../models/Organization');
const router = express.Router();

router.post('/', async (req, res) => {
    const org = await Organization.create(req.body);
    res.json(org);
});

module.exports = router;
