import mongoose from 'mongoose';

/*
    User Schema
*/
const UserSchema = mongoose.Schema(
    {
        org_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: false,
        },
        username: {
            type: String,
            required: true,
            validate: {
                validator: checkName,
                message: 'Username already exists.',
            },
        },
        email: {
            type: String,
            required: true,
            match: ['^[^s@]+@[^s@]+.[^s@]+$', 'Please enter a valid email address.'],
            validate: {
                validator: checkEmail,
                message: 'Email already used.',
            },
        },
        // NOTE: no need for pass since we'll use google login
        // password: {
        //     type: String,
        //     required: true,
        //     minlength: 8,
        //     maxlength: 128,
        // },
        displayName: { // from google
            type: String,
            required: false,
        },
        profilePhoto: { // from google
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

/*
    HELPER FUNCTION
    --
    checks if name already exists
*/
async function checkName(name) {
    try {
        const existing_name = await User.findOne({ username: name });
        return !existing_name;
    } catch (err) {
        console.error('checkName error.');
        return false;
    }
}

/*
    HELPER FUNCTION
    --
    checks if email already exists
*/
async function checkEmail(email) {
    try {
        const existing_email = await User.findOne({ email: email });
        return !existing_email;
    } catch (err) {
        console.error('checkEmail error.');
        return false;
    }
}

export default mongoose.model('User', UserSchema);
