const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');

// init gridfs storage with mongodb connection
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            filename: `${Date.now()}-${file.originalname}`, // default filename
            bucketName: 'uploads', // gridfs collection name
        };
    },
});

const upload = multer({ storage });

module.exports = { gfs, upload };
