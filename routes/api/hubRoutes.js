var hubModel = require('../../domain/postgres/models/hub');
var installationHubModel = require('../../domain/postgres/models/installationHub');
var installationModel = require('../../domain/postgres/models/installation');
var siteHubModel = require('../../domain/postgres/models/siteHub');

function HubRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/hub/:id', auth.ensureAuthenticated, hubRoutes.get);
    self.get = function (req, res) {

        hubModel.get(req.params.id, function (result) {
            res.json({result:result});
        });

    };

    // app.post('/api/hub' ..
    self.save = function (req, res) {
        hubModel.save(req.body, function (err, result) {
            if (err) {
                res.send({err:err});
            }
            else {
                res.send({result:result});
            }
        });
    };

    // app.get('/api/installation/hubs/:installationId', auth.ensureAuthenticated, hubRoutes.getInstallationHubs);
    self.getInstallationHubs = function (req, res) {

        installationHubModel.getInstallationHubs(req.params.installationId, function (result) {
            res.json({result:result});
        });

    };

    // app.get('/api/hubs/:siteId/:installationId' ..
    self.getForSiteInstallation = function (req, res) {

        hubModel.getForSiteInstallation(req.params.siteId, req.params.installationId, function (result) {
            res.json({result:result});
        });

    };

    self.getForSite = function (req, res) {

        siteHubModel.getSiteHubs(req.params.siteId, function (result) {
            res.json({result:result});
        });

    };

    // app.get('/api/hubs/withdevices/:id' ..
    self.getAllWithDevices = function (req, res) {

        if (req.params.id) {
            hubModel.getAllWithDevices(req.params.id, function (result) {
                res.json({result:result});
            });
        }
        else {
            res.json({err:'Hubs are not available'});
        }
    };

    // app.post('/api/installation/hub', auth.ensureAuthenticated, installerRoutes.addHub);
    self.addHubToInstallation = function (req, res) {
        installationHubModel.save(req.body, function (err, result) {
            res.send({err:err, result:result});
        });
    };

    // app.get('/api/site/hub/installations/:id', auth.ensureAuthenticated, installerRoutes.getSiteHubInstallations);
    self.getSiteHubInstallations = function (req, res) {

        installationModel.getSiteInstallations(req.params.siteId, 'hub', function (installations) {
            res.send({result:installations});
        });

    };
}

module.exports = new HubRoutes();
