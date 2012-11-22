var deviceModel = require('../../domain/postgres/models/device');

function DeviceRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/site/devices/:id', auth.ensureAuthenticated, deviceRoutes.getForSite);
    self.getForSite = function (req, res) {
        deviceModel.getForSite(req.params.id, function (result) {
            res.send({result:result});
        });
    };

    // app.get('/api/devices/:id' ..
    self.get = function (req, res) {
        deviceModel.get(req.params.id, function (result) {
            res.send({result:result});
        });
    };

    // app.post('/api/devices' ..
    self.save = function (req, res) {
        deviceModel.save(req.body, function (err, result) {
            if (err) {
                res.send({err:err});
            }
            else {
                res.send({result:result});
            }
        });
    };

    // app.post('/api/devices/delete/:id' ..
    self.remove = function (req, res) {
        deviceModel.remove(req.params.id, function (result) {
            res.send({result:result});

        });
    };

    // app.post('/api/devices/status/:id/:status' ..
    self.changeStatus = function (req, res) {
        deviceModel.changeStatus(req.params.id, req.params.status, function (result) {
            res.send({result:result});
        });
    };

    // app.get('/api/installations/hub/devices/:installationId/:hubId', auth.ensureAuthenticated, deviceRoutes.getForHubInstallation);
    self.getForHubInstallation = function (req, res) {
        deviceModel.getForHubInstallation(req.params.installationId, req.params.hubId, function (result) {
            res.send({result:result});
        });
    };
}

module.exports = new DeviceRoutes();
