import Post from '../models/postModel.js'; // const Post = require('../models/postModel');

export const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
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

