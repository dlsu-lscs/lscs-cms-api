const mongoose = require("mongoose");

/*
    Organization Schema
    --
    kindly adjust admin id if wrong modelling
*/
const OrganizationSchema = mongoose.Schema(
    {
        admin_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: checkName,
                message: "Organization name already registered."
            }
        },
        slug: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

async function checkName(name) {
    try {
        const existing_name = await User.findOne({ username: name });
        return existing_name !== null;
    } catch (err) {
        console.error("checkName error.");
        return false;
    }
}

const Organization = mongoose.model("Organization", OrganizationSchema);
module.exports = Organization;
