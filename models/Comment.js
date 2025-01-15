const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    createdAt: { type: Date, default: Date.now, required: true, },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // for nested comments (like forums)
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
