import { Router } from "express";
import { use, serializeUser, deserializeUser, authenticate } from "passport";
import GoogleStrategy from "passport-google-oidc";
import { get, run } from "../db";

const router = Router();

use(
    new GoogleStrategy(
        {
            clientID: process.env["GOOGLE_CLIENT_ID"],
            clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
            callbackURL: "/auth/google/callback",
            scope: ["email", "profile"],
        },
        // callback
        function verify(issuer, profile, cb) {
            // log the profile data for debugging purposes
            console.log("Authenticated user profile:", profile);
            console.log("User's display name:", profile.displayName);
            console.log("User's email:", profile.emails ? profile.emails[0].value : "No email provided");

            // store the user in the database after successful login
            get(
                "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
                [issuer, profile.id],
                function (err, row) {
                    if (err) {
                        return cb(err);
                    }
                    if (!row) {
                        run("INSERT INTO users (name) VALUES (?)", [profile.displayName], function (err) {
                            if (err) {
                                return cb(err);
                            }

                            const id = this.lastID;
                            run(
                                "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
                                [id, issuer, profile.id],
                                function (err) {
                                    if (err) {
                                        return cb(err);
                                    }
                                    const user = {
                                        id: id,
                                        name: profile.displayName,
                                    };
                                    return cb(null, user);
                                },
                            );
                        });
                    } else {
                        get("SELECT * FROM users WHERE id = ?", [row.user_id], function (err, row) {
                            if (err) {
                                return cb(err);
                            }
                            if (!row) {
                                return cb(null, false);
                            }
                            return cb(null, row);
                        });
                    }
                },
            );
        },
    ),
);

serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

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
    res.render("login");
    // passport.authenticate("google");
});

router.get("/login/google", authenticate("google"));

router.get("/auth/google/callback");

export default router;
