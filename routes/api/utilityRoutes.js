var utilityModel = require('../../domain/postgres/models/utility');
var userModel = require('../../domain/postgres/models/user');
var utilityUserModel = require('../../domain/postgres/models/utilityUser');
var _ = require('underscore');

function Utility() {
    'use strict';

    var self = this;

    // app.get('/api/utility/:id' ..
    self.get = function (req, res) {

        if (req.params.id) {

            utilityModel.get(req.params.id, function (utility) {

                if (utility) {
                    res.json({result : utility});
                }
                else {
                    res.json({err : 'No Utility for current user'});
                }
            });

        }
        else {
            res.json({err : 'No Utility for current user'});
        }
    };

    // app.get('/api/utilities/' ..
    self.getAll = function (req, res) {

        // Check role if Admin then fetch all utilities else fetch for given user

        var adminRole = _.find(req.user.roles, function (role) {
            return role.name === 'admin';
        });

        if (adminRole) {
            utilityModel.getAll(function (result) {

                if (result) {
                    res.json({result : result});
                }
                else {
                    res.json({err : 'No Utilities'});
                }
            });
        }
        else {

            utilityUserModel.getUserUtilities(req.user.id, function (result) {

                if (result) {
                    res.json({result : {utility_users : result}});
                }
                else {
                    res.json({err : 'No Utilities for current user'});
                }
            });

        }
    };

    // app.get('/api/utility/users/:id', utilityRoutes.getUsersForUtility);
    self.getUsersForUtility = function (req, res) {

        if (!isNaN(req.params.id)) {

            utilityModel.getUsersForUtility(req.params.id, function (result) {
                res.json({result : result});
            });

        }
        else {
            res.json({err : 'No users'});
        }
    };

    // app.get('/api/utility/user/:id/:user', utilityRoutes.getUser);
    self.getUser = function (req, res) {

        if (!isNaN(req.params.id)) {

            utilityModel.getUser(req.params.id, req.params.user, function (result) {
                res.json({result : result});
            });

        }
        else {
            res.json({err : 'No users'});
        }
    };

    // app.post('/api/utility' ..
    self.save = function (req, res) {

        utilityModel.save(req.body, function (err, utility) {
            if (err) {
                res.json({err : err});
            }
            else {

                var userUtility = {
                    user_id    : req.user.id,
                    utility_id : utility.id
                };

                utilityUserModel.save(userUtility, function (err, result) {

                    if (err) {
                        if (err === 'Association exists') {
                            res.json({result : result});
                        }
                        else {
                            res.json({err : err});
                        }
                    }
                    else {
                        res.json({result : result});
                    }

                });

            }
        });
    };

    self.addUser = function (req, res) {

        var user = req.body.user;
        var utility = req.body.utility_id;
        var role = req.body.role;

        if (!user || !utility || !role) {
            res.json({err : 'Invalid data'});
        }
        else {

            userModel.get(user.email, function (result) {

                if (result) {

                    var dto = {
                        utility_id : utility,
                        user_id    : result.id
                    };

                    utilityUserModel.save(dto, function (err, result) {

                        dto.role = role;

                        userModel.assignRole(dto, function (err, result) {
                            res.json({err : err, result : result});
                        });

                    });

                }
                else {

                    userModel.save(user, function (err, result) {

                        if (result) {
                            var dto = {
                                utility_id : utility,
                                user_id    : result.id
                            };

                            utilityUserModel.save(dto, function (err, result) {

                                dto.role = role;

                                userModel.assignRole(dto, function (err, result) {
                                    res.json({err : err, result : 'invited'});
                                });

                            });
                        }
                        else {
                            res.json({err : err, result : 'error'});
                        }

                    });

                }
            });
        }

    };

}

module.exports = new Utility();
