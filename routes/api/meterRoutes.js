var meterModel = require('../../domain/postgres/models/meter');
var siteModel = require('../../domain/postgres/models/site');
var _ = require('underscore');

function Meters() {
    'use strict';

    var self = this;

    //  app.get('/api/site/meters/:id', meterRoutes.getForSite);
    self.getForSite = function (req, res) {

        siteModel.getChildren(req.params.id, function (result) {

            var sites = _.pluck(result, 'id');
            sites.push(req.params.id);

            meterModel.getForSites(sites, function (result) {
                res.json({result : result});
            });
        });

    };

    // app.get('/api/customer/meters/:customer', meterRoutes.getForCustomer);
    self.getForCustomer = function (req, res) {

        meterModel.getForCustomer(req.params.customer, function (result) {
            res.json({result : result});
        });

    };

    // app.get('/api/owner/meters/:owner', meterRoutes.getForOwner);
    self.getForOwner = function (req, res) {

        meterModel.getForOwner(req.params.owner, function (result) {
            res.json({result : result});
        });

    };

    // app.get('/api/meter/:id' ..
    self.get = function (req, res) {
        meterModel.get(req.params.id, function (result) {
            res.send({result : result});
        });
    };

    // app.post('/api/meters' ..
    self.save = function (req, res) {
        meterModel.save(req.body, function (err, result) {
            if (err) {
                res.send({err : err});
            }
            else {
                res.send({result : result});
            }
        });
    };

    // app.post('/api/meter/delete/:id' ..
    self.remove = function (req, res) {
        meterModel.remove(req.params.id, function (result) {
            res.send({result : result});

        });
    };

    // app.post('/api/meter/status/:id/:status' ..
    self.changeStatus = function (req, res) {
        meterModel.changeStatus(req.params.id, req.params.status, function (result) {
            res.send({result : result});
        });
    };

}

module.exports = new Meters();
