const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Object, required: true },
    category: { type: String, required: true },
    featuredImg: { data: Buffer, imgType: String },
    createdAt: { type: Date, default: Date.now },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    orgIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', PostSchema);
