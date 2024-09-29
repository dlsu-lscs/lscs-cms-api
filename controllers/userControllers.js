/**
 * CONTROLLER FILE
 * --
 * TODO: Set up 3 controller files for each model
 */


const User = require('../models/userModel');

exports.createUser = async function(req, res) {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async function(req, res) {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({message: "User not found."});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async function(req, res) {
    try{
        const { user_id } = req.params;
        const user = await User.findByIdAndUpdate(user_id, req.body);

        if (!user) {
            return res.status(404).json({ message: "User not found."});
        }

        // return the updated org body
        const updatedUser = await User.findById(user_id);
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async function(req, res) {
    try {
        const { user_id } = req.params;
        const user = await User.findByIdAndDelete(user_id, req.body);

        if (!user) {
            res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message:"User deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}