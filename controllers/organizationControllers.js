/**
 * CONTROLLER FILE
 * --
 * TODO: Set up 3 controller files for each model
 */

const Organization = require('../models/organizationModel');

exports.createOrganization = async function(req, res) {
    try {
        const org = await Organization.create(req.body);

        res.status(201).json(org);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrganization = async function(req, res) {
    try {
        const { org_id } = req.params;
        const org = await Organization.findById(org_id);

        if (!org) {
            return res.status(404).json({message: "Organization not found."});
        }

        res.status(200).json(org);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrganization = async function(req, res) {
    try{
        const { org_id } = req.params;
        const org = await Organization.findByIdAndUpdate(org_id, req.body);

        if (!org) {
            return res.status(404).json({ message: "Organization not found."});
        }

        // return the updated org body
        const updatedOrg = await Organization.findById(org_id);
        res.status(201).json(updatedOrg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteOrganization = async function(req, res) {
    try {
        const { org_id } = req.params;
        const org = await Organization.findByIdAndDelete(org_id, req.body);

        if (!org) {
            res.status(404).json({ message: "Organization not found." });
        }

        res.status(200).json({ message:"Organization deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}