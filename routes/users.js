const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth');

// GET /users
// - gets all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// GET /users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('orgIds', 'name slug');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user.' });
    }
});

// TODO: GetUserInfoById (or GetUserInfoByEmail ?)

// POST: /users/join
// - user joining an organization
router.post('/join', ensureAuthenticated, async (req, res) => {
    try {
        const { orgId } = req.body;
        const userId = req.user._id;

        const org = await Organization.findById(orgId);
        if (!org) {
            return res.status(404).json({ error: 'Organization not found.' });
        }

        // push current userId to Organization.members array
        org.members.push(userId);
        await org.save();

        // push orgId to User.orgId array 
        await User.findByIdAndUpdate(userId, {
            $push: { orgIds: orgId }
        });

        res.status(200).json({ message: 'User added to organization.' });
    } catch (error) {
        console.error('Error joining organization:', error);
        res.status(500).json({ error: 'An error occurred while joining the organization.' });
    }
});

module.exports = router;
