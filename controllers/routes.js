import express from 'express'; // const express = require('express');
import {
    createOrganization,
    deleteOrganization,
    getOrganizationById,
    updateOrganization,
} from '../services/organizationService.js';
import { createUser, deleteUser, getUserById, updateUser } from '../services/userService.js';
import { createPost, deletePost, getPostById, updatePost } from '../services/postService.js';

const router = express.Router();

/* ***** ORGANIZATIONS ***** */
router.post('/orgs', createOrganization);
router.get('/orgs/:id', getOrganizationById);
router.put('/orgs/:id', updateOrganization);
router.delete('/orgs/:id', deleteOrganization);

/* ***** USERS ***** */
router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

/* ***** POSTS ***** */
router.post('/posts', createPost);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
