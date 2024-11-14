import mongoose from 'mongoose';

/*
    Post Schema
    --
    kindly adjust admin id if wrong modelling
*/
const PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: [{
            type: {
                type: String,
                required: true,
            },
            data: {
                type: Object,
                required: true,
            }
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        featured_img: {
            data: Buffer,
            imgType: String,
        },
        created_on: {
            type: Date,
            default: Date.now,
            required: true,
        },
        author: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }],
        category: {
            type: String,
            required: true,
        },
        org_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);
