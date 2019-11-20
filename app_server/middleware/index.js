function loggedOut(req, res, next) {
    if(req.session && req.session.userName) {
        return res.redirect('/');
    }
    return next();
};

function requiresLogin(req, res, next) {
    if (req.session && req.session.userName) {
        return next();
    } else {
        var err = new Error('You must be logged in to view this page');
        err.status = 401;
        return next(err);
    }
};

module.exports = {
    loggedOut,
    requiresLogin
};