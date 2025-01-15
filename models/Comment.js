const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true, },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true, },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
