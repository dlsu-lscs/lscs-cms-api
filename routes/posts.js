const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth')

// POST: /posts
// request body expects: title, content, category, orgId
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        // NOTE: for orgId, frontend should pass one or many orgId of the current user
        const { title, content, category, orgId } = req.body;
        const authorId = req.user._id;

        if (!title || !content || !category || !orgId) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const user = await User.findById(authorId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // check if user is in the organization
        const validOrg = Array.isArray(orgId)
            ? orgId.some(id => user.orgIds.includes(id))
            : user.orgIds.includes(orgId);

        if (!validOrg) {
            return res.status(403).json({ error: 'User is not a member of the organization.' });
        }

        const newPost = new Post({
            title,
            content,
            category,
            authorId: authorId,
            orgId
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'An error occurred while creating the post.' });
    }
});

// GET: /posts/:id
// - fetch one post by its id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email orgId')
            .populate('orgId', 'name');

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
});

// TODO: GetAllPostsByUserEmail

module.exports = router;
