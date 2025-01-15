const express = require('express');
const Organization = require('../models/Organization');
const { ensureAuthenticated } = require('../middlewares/auth')
const router = express.Router();

// POST: /orgs
// request body expects: 
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const adminId = req.user._id; // current user will be admin (the one who creates the organization)

        const newOrg = new Organization({
            name,
            slug,
            description,
            adminId,
        });

        const savedOrg = await newOrg.save();

        res.status(201).json(savedOrg);
    } catch (error) {
        console.error('Error creating organization:', error);
        res.status(500).json({ error: 'An error occurred while creating the organization.' });
    }
});

module.exports = router;
