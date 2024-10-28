import express from 'express'; // const express = require('express');
import {
    createOrganization,
    deleteOrganization,
    getOrganizationById,
    updateOrganization,
} from '../services/organizationService.js';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../services/userService.js';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../services/postService.js';
import { authorizationMiddleware } from '../middlewares/authMiddleware.js';

/* ***** ORGANIZATIONS ***** */
export const orgsRouter = express.Router(); // -->  for '/orgs'

// POST '/orgs'
orgsRouter.post('/', createOrganization);
// GET '/orgs/:id'
orgsRouter.get('/:id', getOrganizationById);
// PUT '/orgs/:id'
orgsRouter.put('/:id', updateOrganization);
// DELETE '/orgs/:id'
orgsRouter.delete('/:id', deleteOrganization);

/* ***** USERS ***** */
export const usersRouter = express.Router(); // --> for '/users'

// POST '/users'
usersRouter.post('/', createUser);
// GET '/users'
usersRouter.get('/', getUsers);
// GET '/users/id'
usersRouter.get('/:id', getUserById);
// PUT '/users/id'
usersRouter.put('/:id', updateUser);
// DELETE '/users/id'
usersRouter.delete('/:id', deleteUser);

/* ***** POSTS ***** */
export const postsRouter = express.Router(); // -->  for '/posts'

// POST '/posts'
postsRouter.post('/', authorizationMiddleware, createPost);
// GET '/posts'
postsRouter.get('/', getPosts);
// GET '/posts/:id'
postsRouter.get('/:id', getPostById);
// PUT '/posts/:id'
postsRouter.put('/:id', authorizationMiddleware, updatePost);
// DELETE '/posts/:id'
postsRouter.delete('/:id', authorizationMiddleware, deletePost);
