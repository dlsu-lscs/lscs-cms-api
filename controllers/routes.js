import express from 'express'; // const express = require('express');
import {
    createOrganization,
    deleteOrganization,
    getOrganization,
    updateOrganization,
} from '../services/organizationService.js';
import { createUser, deleteUser, getUser, updateUser } from '../services/userService.js';
import { createPost, deletePost, getPost, updatePost } from '../services/postService.js';

const router = express.Router();

/* ***** ORGANIZATIONS ***** */
router.post('/orgs', createOrganization);
router.get('/org/:id', getOrganization);
router.put('/org/:id', updateOrganization);
router.delete('/org/:id', deleteOrganization);

/* ***** USERS ***** */
router.post('/users', createUser);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

/* ***** POSTS ***** */
router.post('/posts', createPost);
router.get('/post/:id', getPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);
