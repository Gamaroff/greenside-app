var siteModel = require('../../domain/postgres/models/site');
var siteUserModel = require('../../domain/postgres/models/siteUser');
var siteCustomerModel = require('../../domain/postgres/models/siteCustomer');
var userModel = require('../../domain/postgres/models/user');
var _ = require('underscore');

function SiteRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/sites/:id' ..
    self.getForUtility = function (req, res) {

        if (req.params.id) {
            siteModel.getForUtility(req.params.id, function (result) {
                res.json({result : result});
            });
        }
        else {
            res.json({err : 'Sites are not available'});
        }

    };

    // app.get('/api/sites/children/:id' ..
    self.getChildren = function (req, res) {

        if (req.params.id) {
            siteModel.getChildren(req.params.id, function (result) {
                res.json({result : result});
            });
        }
        else {
            res.json({err : 'Sites are not available'});
        }

    };

    // app.get('/api/sites' ..
    self.getSiteUserSites = function (req, res) {
        siteUserModel.getSitesForUser(req.user.id, function (result) {
            res.json({result : result});
        });
    };

    // app.get('/api/site/:id' ..
    self.get = function (req, res) {
        siteModel.get(req.params.id, function (result) {
            res.json({result : result});
        });
    };

    // app.post('/api/sites' ..
    self.save = function (req, res) {

        siteModel.save(req.body, function (err, result) {
            if (err) {
                res.json({err : err});
            }
            else {
                res.json({result : result});
            }
        });
    };

    // app.get('/api/site/users/:id' ..
    self.getUsers = function (req, res) {
        siteUserModel.getUsers(req.params.id, function (result) {
            res.json({result : result});
        });
    };

    // app.post('/api/site/user' ..
    self.addUser = function (req, res) {

        userModel.get(req.body.email, function (user) {

            if (user) {

                var dto = {
                    site_id : req.body.site_id,
                    user_id : user.id,
                    role    : req.body.role
                };

                siteUserModel.save(dto, function (err, result) {

                    userModel.assignRole(dto, function (err, result) {
                        res.json({err : err, result : result});
                    });

                });

            }
            else {

                userModel.save(req.body, function (err, result) {

                    if (result) {
                        var dto = {
                            site_id : req.body.site_id,
                            user_id : result.id,
                            role    : req.body.role
                        };

                        siteUserModel.save(dto, function (err, result) {

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

    };

    // app.get('/api/site/customers/:id', auth.ensureAuthenticated, siteRoutes.getCustomers);
    self.getCustomers = function (req, res) {

        siteModel.getCustomers(req.params.id, function (result) {
            res.json({result : result});
        });

    };

    // app.post('/api/site/customer', auth.ensureAuthenticated, siteRoutes.addCustomer);
    self.addCustomer = function (req, res) {

        if (req.body.customer.id) {

            var dto = {
                site_id : req.body.site_id,
                user_id : req.body.customer.id,
                role    : req.body.role
            };

            siteCustomerModel.save(dto, function (err, result) {

                userModel.assignRole(dto, function (err, result) {
                    res.json({err : err, result : result.user});
                });

            });

        }
        else {

            userModel.save(req.body.customer, function (err, user) {

                if (user) {
                    var dto = {
                        site_id : req.body.site_id,
                        user_id : user.id
                    };

                    siteCustomerModel.save(dto, function (err, result) {

                        dto.role = req.body.role;

                        userModel.assignRole(dto, function (err, result) {
                            res.json({err : err, result : user});
                        });

                    });
                }
                else {
                    res.json({err : err});
                }

            });

        }

    };

    // app.post('/api/site/assigntariff/:siteId/:tariffId ...
    self.assignTariff = function (req, res) {

        var siteQualifiers = req.body.TariffQualifiers;

        var tariffQualifiers = '';

        _.each(siteQualifiers, function (item, index) {
            if (index > 0) {
                tariffQualifiers += '-';
            }

            tariffQualifiers += item.Qualifier + ':' + item.Item;
        });

        siteModel.assignTariff(req.params.siteId, req.params.tariffId, tariffQualifiers, function (err, result) {
            if (err) {
                res.json({err : err});
            }
            else {
                res.json({result : result});
            }
        });
    };

}

module.exports = new SiteRoutes();
