// checks cookie session (connect.sid), session is saved by express-session (for cookies) automatically
// and then passport.js sets req.user._id to _id of current authenticated user
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = { ensureAuthenticated };
