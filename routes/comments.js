const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// POST: add comment on a post
// request body expects: content, parentCommentId (optional for nested comments)
router.post('/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, parentCommentId } = req.body;
        const authorId = req.user._id; // get author from current user (authenticated session)

        if (!content) {
            return res.status(400).json({ error: 'Content and authorId are required' });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // check parent comment if it really exists (if parent comment is provided in the request body)
        let parentComment = null;
        if (parentCommentId) {
            parentComment = await Comment.findById(parentCommentId);
            if (!parentComment) {
                return res.status(404).json({ error: 'Parent comment not found' });
            }
        }

        const newComment = new Comment({
            content,
            author: authorId,
            postId,
            parentComment: parentComment ? parentComment._id : null
        });

        const savedComment = await newComment.save();

        post.comments.push(savedComment._id);
        await post.save();

        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Error adding comment' });
    }
});

// GET: fetch all comments for a post
router.get('/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ postId })
            .populate('author', 'name email')
            .populate('parentComment');

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Error fetching comments' });
    }
});

// DELETE: delete a comment
router.delete('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find and delete the comment
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Remove the comment reference from the associated post
        await Post.updateOne(
            { comments: commentId },
            { $pull: { comments: commentId } }
        );

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting comment' });
    }
});

module.exports = router;
