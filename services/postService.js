import Post from '../models/Post.js'; // const Post = require('../models/postModel');

// POST /posts?org_id=123
export const createPost = async (req, res) => {
    try {
        const orgId = req.user.org_id;

        if (orgId.toString() !== orgId) {
            return res.status(403).json({ message: "Unauthorized: You can't create posts for another organization." });
        }
        const postData = { ...req.body, org_id: orgId };
        const post = await Post.create(postData);

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /posts
export const getPosts = async (req, res) => {

    let { page, pageSize } = req.query;

    try {
        page = parseInt(page, 10) || 1;
        pageSize = parseInt(pageSize, 10) || 50;

        // mongodb aggregation framework
        const posts = await Post.aggregate([
            {
                $facet: {
                    metadata: [{ $count: 'totalCount' }],
                    data: [
                        { $skip: (page - 1) * pageSize },
                        { $limit: pageSize }
                    ]
                }
            }
        ]);

        const totalCount = (posts[0].metadata[0] && posts[0].metadata[0].totalCount) || 0;

        res.status(200).json({
            success: true,
            posts: {
                metadata: { totalCount, page, pageSize },
                data: posts[0].data
            }
        });
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
