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
        const { title, content, category, orgIds } = req.body;
        const authorId = req.user._id;

        if (!title || !content || !category || !orgIds || orgIds.length === 0) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const user = await User.findById(authorId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const invalidOrgIds = orgIds.filter(orgId => !user.orgIds.includes(orgId));
        if (invalidOrgIds.length > 0) {
            return res.status(400).json({ error: `User is not a member of the following organizations: ${invalidOrgIds.join(', ')}` });
        }

        const newPost = new Post({
            title,
            content,
            category,
            authorId: authorId,
            orgIds
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
            .populate('author', 'name email')
            .populate('orgIds', 'name slug')
            .populate('comments');

        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'An error occurred while fetching the post.' });
    }
});


// GET: /posts/org/:orgId
// - fetch posts for a specific organization
router.get('/org/:orgId', async (req, res) => {
    try {
        const { orgId } = req.params;
        const posts = await Post.find({ orgIds: orgId })
            .populate('author', 'name email')
            .populate('orgIds', 'name slug')
            .populate('comments');

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'An error occurred while fetching the posts.' });
    }
});

// TODO: GetAllPostsByUserEmail

// PUT: /posts/:id
// - update a post by ID
router.put('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { title, content, category, orgIds } = req.body;
        const authorId = req.user._id;

        if (!title || !content || !category || !orgIds || orgIds.length === 0) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const user = await User.findById(authorId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // check if post exists
        const post = await Post.findById(req.param.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        // TODO: check if Post.author is the same as authorId

        // check if current user is a member in the org
        const invalidOrgIds = orgIds.filter(orgId => !user.orgIds.includes(orgId));
        if (invalidOrgIds.length > 0) {
            return res.status(400).json({ error: `User is not a member of the following organizations: ${invalidOrgIds.join(', ')}` });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, category, orgIds },
            { new: true }
        ).populate('author', 'name email').populate('orgIds', 'name slug').populate('comments');
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'An error occurred while updating the post.' });
    }
});



module.exports = router;
