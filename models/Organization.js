const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    slug: { type: String, required: true },
    description: String,
    createdAt: { type: Date, default: Date.now },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    // TODO: maybe add the members: [], store multiple refs? like a JOIN
});

module.exports = mongoose.model('Organization', OrganizationSchema);
