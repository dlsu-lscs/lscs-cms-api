import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true, },
    originalName: { type: String, required: true, },
    size: { type: Number, required: true, },
    path: { type: String, required: true, },
    createdAt: { type: Date, default: Date.now, },
});

export default mongoose.model('File', FileSchema);
