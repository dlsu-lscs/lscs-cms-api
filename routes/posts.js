const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/auth')

// POST: /posts
// request body expects: title, content, category, orgId
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const { title, content, category, orgId } = req.body; // orgId, frontend should pass the orgId of the current user (maybe create
        const authorId = req.user._id;

        if (!title || !content || !category || !orgId) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // NOTE: given authorId, check org if belongs
        // - use User._id, User.orgId


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
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email orgId')
            .populate('orgId', 'name');

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
});

// TODO: GetAllPostsByUserEmail

module.exports = router;
