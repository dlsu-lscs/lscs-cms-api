import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './db/connection.js';
import { orgsRouter, postsRouter, usersRouter } from './controllers/routes.js';

const env = process.env.NODE_ENV; // NOTE: prod envs are on coolify
if (env === '' || env === 'development') {
    dotenv.config({ path: '.env' }); // only load .env when dev
}

const app = express();
const port = process.env.API_PORT || 3500;

// call db connection
dbConnection();

// #region middleware

app.use(cors());
app.use(express.json());

app.use('/orgs', orgsRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/uploads', express.static('uploads'));

// #endregion middleware

// test: curl http://localhost:3500/
app.use('/', (req, res) => {
    console.log('HEALTHY');
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});
