import Organization from '../models/organizationModel.js';

// POST /orgs
export const createOrganization = async (req, res) => {
    try {
        const org = await Organization.create(req.body);

        res.status(201).json(org);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /orgs/:id
export const getOrganizationById = async (req, res) => {
    try {
        const { org_id } = req.params;
        const org = await Organization.findById(org_id);

        if (!org) {
            return res.status(404).json({ message: 'Organization not found.' });
        }

        res.status(200).json(org);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT /orgs/:id - mainly for updating the org's admin (leader/cms manager/any)
export const updateOrganization = async (req, res) => {
    try {
        const { org_id } = req.params;
        const org = await Organization.findByIdAndUpdate(org_id, req.body);

        if (!org) {
            return res.status(404).json({ message: 'Organization not found.' });
        }

        // return the updated org body
        const updatedOrg = await Organization.findById(org_id);
        res.status(201).json(updatedOrg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /orgs/:id
export const deleteOrganization = async (req, res) => {
    try {
        const { org_id } = req.params;
        const org = await Organization.findByIdAndDelete(org_id, req.body);

        if (!org) {
            res.status(404).json({ message: 'Organization not found.' });
        }

        res.status(200).json({ message: 'Organization deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const checkIfOrgExists = async (req, res) => {
    try {
        // hit database -> get name of org
        // if exists, then good
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
