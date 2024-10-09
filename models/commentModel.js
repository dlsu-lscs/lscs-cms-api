// comment model
// - add post foreign key
//
// follow cms

import mongoose from 'mongoose';

const CommentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        created_on: {
            type: Date,
            default: Date.now,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        org_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Comment', CommentSchema);