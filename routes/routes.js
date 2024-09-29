/* !!!~~ NOTE: TO BE REFACTORED, lez make it simple rn ~~!!! 
 * TODO: 
 * - organize routes
 * - add 'get all' routes
 * - add specific routes
 * */
const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationControllers.js');
const postController = require('../controllers/postControllers.js');
const userController = require('../controllers/userControllers.js');


// Controllers / Routes

/* ***** ORGANIZATIONS ***** */
router.post('/orgs', organizationController.createOrganization);
router.get('/org/:id', organizationController.getOrganization);
router.put('/org/:id', organizationController.updateOrganization);
router.delete('/org/:id', organizationController.deleteOrganization);

/* ***** USERS ***** */
router.post('/users', userController.createOrganization);
router.get('/user/:id', userController.getOrganization);
router.put('/user/:id', userController.updateOrganization);
router.delete('/user/:id', userController.deleteOrganization);

/* ***** POSTS ***** */
router.post('/posts?org_id=<value>', postController.createOrganization);
router.get('/post/:id', postController.getOrganization);
router.put('/post/:id', postController.updateOrganization);
router.delete('/post/:id', postController.deleteOrganization);