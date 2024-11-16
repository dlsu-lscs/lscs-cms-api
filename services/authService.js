import { Router } from "express";
import { use, authenticate } from "passport";
import GoogleStrategy from "passport-google-oidc";
import User from "../models/userModel.js";

const router = Router();

use(
    new GoogleStrategy(
        {
            clientID: process.env['GOOGLE_CLIENT_ID'],
            clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
            callbackURL: '/auth/google/callback',
            scope: ['email', 'profile'],
        },
        async function verify(issuer, profile, cb) {
            try {
                // Log the profile data for debugging
                console.log('Authenticated user profile:', profile);

                // Extract Google user details
                const googleId = profile.id;
                const email = profile.emails ? profile.emails[0].value : null;
                const displayName = profile.displayName;
                const profilePhoto = profile.photos ? profile.photos[0].value : null;

                if (!email) {
                    return cb(new Error('No email provided by Google'), null);
                }

                // Check if the user already exists
                let user = await User.findOne({ googleId });

                if (!user) {
                    // If not, create a new user
                    user = new User({
                        googleId,
                        email,
                        displayName,
                        profilePhoto,
                    });
                    await user.save();
                }

                // Pass the user to Passport
                return cb(null, user);
            } catch (error) {
                console.error('Error in Google Strategy callback:', error);
                return cb(error, null);
            }
        },
    ),
);

router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        // maybe also destory session?
        res.redirect("/");
    });
});

// renders page (web)
router.get("/login", function (req, res, next) {
    // res.render("login");
    passport.authenticate("google");
});

router.get('/auth/google/callback', authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/'); // redirect to home page after successful login
});

export default router;
