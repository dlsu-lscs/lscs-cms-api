const express = require('express');
const Organization = require('../models/Organization');
const { ensureAuthenticated } = require('../middlewares/auth')
const router = express.Router();

// POST: /orgs
// request body expects: name, slug, description
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const adminId = req.user._id; // current user will be admin (the one who creates the organization)

        const newOrg = new Organization({
            name,
            slug,
            description,
            adminId,
            members: [adminId] // first member of new org will be its creator
        });

        const savedOrg = await newOrg.save();

        // push new orgId to current user 
        await User.findByIdAndUpdate(adminId, {
            $push: { orgIds: savedOrg._id }
        });

        res.status(201).json(savedOrg);
    } catch (error) {
        console.error('Error creating organization:', error);
        res.status(500).json({ error: 'An error occurred while creating the organization.' });
    }
});


// GET /orgs/:id
router.get('/:id', async (req, res) => {
    try {
        const org = await Organization.findById(req.params.id)
            .populate('members', 'name email')

        if (!org) {
            return res.status(404).json({ error: 'Organization not found.' });
        }

        res.status(200).json(org);
    } catch (error) {
        console.error('Error fetching organization:', error);
        res.status(500).json({ error: 'An error occurred while fetching the organization.' });
    }
});

module.exports = router;
