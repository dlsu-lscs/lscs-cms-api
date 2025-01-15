require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
require('./config/passport');
const { upload } = require('./config/gridfs');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// db
mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log('[/] MongoDB connected')
    })
    .catch((err) => console.error(err));

mongoose.connection.once('open', async () => {
    console.log(`Connected to database: ${mongoose.connection.name}`);

    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:');
        collections.forEach((collection) => console.log(` - ${collection.name}`));
    } catch (err) {
        console.error('Error listing collections:', err);
    }
});

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/orgs', require('./routes/organizations'));
app.use('/posts', require('./routes/posts'));
app.use('/files', require('./routes/files'));
app.use('/', require('./routes/comments'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
