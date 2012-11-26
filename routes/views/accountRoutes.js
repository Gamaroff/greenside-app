var userModel = require('../../domain/postgres/models/user');
var passport = require('passport');
var _ = require('underscore');
var viewUtil = require('../../app/viewUtil');

function AccountRoutes() {
    'use strict';

    var self = this;

        // app.get('/account' ...
    self.view = function (req, res) {
        viewUtil.renderView(req, res, 'account/account', 'Your Account', 'account');
    };

    // app.get('/login', ..
    self.viewLogin = function (req, res) {
        viewUtil.renderView(req, res, 'account/login', 'Login to Scouter', 'account');
    };

    // app.get('/activate/:email/:id', ..
    self.viewActivate = function (req, res) {

        if (req.user) {
            req.logout();
            res.redirect('/');
        }
        else {
            if (!req.params.id || !req.params.email) {
                viewUtil.renderView(req, res, 'home/index', 'Scouter', 'home');
            }
            else {

                userModel.getUserToActivate(req.params.email, req.params.id, function (err, result) {

                    var params = {
                        email:result.email,
                        hash:result.hash,
                        canActivate:result.canActivate,
                        message:err
                    };

                    viewUtil.renderView(req, res, 'account/activate', 'Activate Account', 'account', params);

                });
            }
        }

    };

    self.viewActivated = function (req, res) {
        viewUtil.renderView(req, res, 'account/activated', 'Account Activated', 'account');
    };

    self.viewActivation = function (req, res) {
        viewUtil.renderView(req, res, 'account/activation', 'Activation Required', 'account');
    };

    self.changePassword = function (req, res) {
        if (req.body) {
            userModel.changePassword(req.body, function (err, result) {
                res.send({err:err, result:result});
            });
        }
    };

    // app.post('/register', accountRoutes.register);
    self.register = function (req, res) {

        var newUser = {
            email : req.body.email
        };

        userModel.save(newUser, function (err, result) {
            res.send({err : err, data : result});
        });

    };

    self.login = function (req, res) {
        res.send({result:true});
    };

    self.doLogin = function (req, res, next) {

        // check activation

        userModel.get(req.body.username, function (result) {
            if (!result) {
                res.send({err:'User does not exist'});
            }
            else {
                if (result.activated) {
                    // if activated
                    passport.authenticate('local', function (err, user, info) {
                        if (err || !user) {
                            res.send({err:info.message});
                        }
                        else {
                            req.logIn(user, function (err) {
                                if (err) {
                                    res.send({err:err});
                                }
                                else {
                                    res.send({result:true});
                                }
                            });
                        }
                    })(req, res, next);
                }
                else {
                    res.send({err:'Activation Required'});
                }
            }
        });

    };

    // app.get('/logout'...)
    self.logout = function (req, res) {
        req.logout();
        res.redirect('/');
    };

    self.viewRegister = function (req, res) {
        if (req.user) {
            res.redirect('/account');
        }

        viewUtil.renderView(req, res, 'account/register', 'Register a new user');
    };

    self.viewRegistered = function (req, res) {
        if (req.user) {
            res.redirect('/account');
        }

        viewUtil.renderView(req, res, 'account/registered', 'Registered');
    };

    self.changePassword = function (req, res) {
        if (req.body) {
            userModel.changePassword(req.body, function (err, result) {
                res.send({err : err, data : result});
            });
        }
    };

    // app.post('/subscribe'...)
    self.subscribe = function (req, res) {

        var prospect = {
            email:req.body.email,
            subscribe:req.body.subscribe
        };

        prospectModel.save(prospect, function (err, result) {
            res.send({err:err, result:result});
        });

    };

    // app.get('/unsubscribe/:email'...)
    self.viewUnsubscribe = function (req, res) {
        prospectModel.unsubscribe(req.params.email, function (err, result) {
            var params = {
                errorMessage:err,
                message:result
            };

            viewUtil.renderView(req, res, 'account/unsubscribed', 'Subscription', null, params);
        });
    };

    // app.get('/unsubscribe'...)
    self.viewUnsubscribeEmail = function (req, res) {
        viewUtil.renderView(req, res, 'account/unsubscribe', 'Unsubscribe from Scouter');
    };

}

module.exports = new AccountRoutes();
