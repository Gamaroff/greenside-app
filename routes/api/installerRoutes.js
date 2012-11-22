var installationModel = require('../../domain/postgres/models/installation');
var installationHubModel = require('../../domain/postgres/models/installationHub');
var _ = require('underscore');

function InstallerRoutes() {
    'use strict';

    var self = this;

    // app.post('/api/installation' ..
    self.save = function (req, res) {

        req.body.user_id = req.user.id;

        installationModel.save(req.body, function (err, result) {
            if (err) {
                res.json({err:err});
            }
            else {
                res.json({result:result});
            }
        });
    };

    // app.get('/api/installation/:id', auth.ensureAuthenticated, installerRoutes.get);
    self.get = function (req, res) {

        if (req.params.id) {
            installationModel.get(req.params.id, function (result) {
                res.send({result:result});
            });

        } else {
            res.send({err:'error'});
        }
    };





}

module.exports = new InstallerRoutes();
