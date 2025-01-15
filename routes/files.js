const express = require('express');
const mongoose = require('mongoose');
const { gfs, upload } = require('../gridfs');
const router = express.Router();

// POST: upload
router.post('/upload', upload.single('file'), (req, res) => {
    res.status(201).json({ file: req.file });
});

// GET: download by filename
router.get('/download/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }
        // Check if the file is an image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({ err: 'Not an image' });
        }
    });
});

// DELETE
router.delete('/delete/:id', (req, res) => {
    gfs.remove({ _id: mongoose.Types.ObjectId(req.params.id), root: 'uploads' }, (err) => {
        if (err) return res.status(404).json({ err: err.message });
        res.status(204).send();
    });
});

module.exports = router;
