import User from '../models/userModel.js'; // const User = require('../models/userModel');

// POST /users?org_id=123
export const createUser = async (req, res) => {
    try {
        const orgId = req.query.org_id;
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /users/:id
export const getUserById = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findByIdAndUpdate(user_id, req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // return the updated org body
        const updatedUser = await User.findById(user_id);
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findByIdAndDelete(user_id, req.body);

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
