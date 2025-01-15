const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// POST: /posts
// request body expects: 
router.post('/', async (req, res) => {
    try {
        const { title, content, category, author, orgId } = req.body;

        if (!title || !content || !category || !author || !orgId) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newPost = new Post({
            title,
            content,
            category,
            author,
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

module.exports = router;
