const mongoose = require("mongoose");

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
        content: {
            type: String,
            required: true,
        },
        featured_img: {
            data: Buffer,
            imgType: String
        },
        created_on: {
            type: Date,
            required: true
        },
        author: {
            type: [ mongoose.Schema.Types.ObjectId ],
            required: true
        },
        category: {
            type: String,
            required: true
        },
        org_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Post", PostSchema);