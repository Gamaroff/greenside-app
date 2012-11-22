// dependencies for authentication
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var User = require('../domain/postgres/models/user');

passport.use(new LocalStrategy(function(username, password, done) {

	User.authenticate(username, password, function(err, user) {

		if (err) {
            return done(null, false, { message: err });
		}

		if (!user) {
			return done(null, false, {
				message : err
			});
		}
		return done(null, user);
	});
}));

// serialize user on login
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// deserialize user on logout
passport.deserializeUser(function(id, done) {
	User.get(id, function(user) {
		done(null, user);
	});
});


function Auth () {
    'use strict';

   var self = this;

    self.ensureAuthenticated = function(req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    };

}

module.exports = new Auth();
