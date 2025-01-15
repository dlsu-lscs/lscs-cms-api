const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /@dlsu\.edu\.ph$/ },
    createdAt: { type: Date, default: Date.now },
    lastLogin: String,
    orgId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }]
});

module.exports = mongoose.model('User', UserSchema);
