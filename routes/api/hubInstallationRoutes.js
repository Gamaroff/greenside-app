var installationModel = require('../../domain/postgres/models/hubInstallation');
var _ = require('underscore');

function HubInstallationRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/device/installations/:id' ..
    self.getInstallations = function (req, res) {

        if (req.params.id) {
            installationModel.getInstallations(req.params.id, 2, function (installations) {
                res.send({result:installations});
            });

        } else {
            res.send({err:'Not authenticated'});
        }
    };

    // app.get('/api/device/installation/:id' ..
    self.getInstallation = function (req, res) {

        if (req.params.id) {
            installationModel.get(req.params.id, function (installation) {
                res.send({result:installation});
            });

        } else {
            res.send({err:'No Installation Found'});
        }
    };

    // app.post('/api/installation' ..
    self.saveInstallation = function (req, res) {

        req.body.user_id = req.user.id;

        installationModel.saveFullInstallation(req.body, function (err, result) {
            if (err) {
                res.json({err:err});
            }
            else {
                res.json({result:result});
            }
        });
    };

}

module.exports = new HubInstallationRoutes();
