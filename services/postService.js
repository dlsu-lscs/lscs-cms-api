import Post from '../models/postModel.js'; // const Post = require('../models/postModel');

// POST /posts?org_id=123
export const createPost = async (req, res) => {
    try {
        // TODO: validation
        // - check req.query.org_id === user's org_id
        // - test code below --> should automatically apply user's org_id to post's org_id
        // const orgId = req.query.org_id;
        // const postData = {...req.body, org_id: orgId };
        const post = await Post.create(req.body); // const post = await Post.create(postData);
        // res.send(`Creating a post for organization ID: ${orgId}`);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        if (!posts) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /posts/:id
export const getPostById = async (req, res) => {
    try {
        const { post_id } = req.params;
        const post = await Post.findById(post_id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /posts/:id
export const updatePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const post = await Post.findByIdAndUpdate(post_id, req.body);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // return the updated org body
        const updatedPost = await Post.findById(post_id);
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /posts/:id
export const deletePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const post = await Post.findByIdAndDelete(post_id, req.body);

        if (!post) {
            res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json({ message: 'Post deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
