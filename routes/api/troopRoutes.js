var troopModel = require('../../domain/system/models/troop');
var _ = require('underscore');

function TroopRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/troops', troopRoutes.getAll);
    self.getAll = function (req, res) {
        troopModel.getAll(function (err, result) {
            res.json({err : err, data : result});
        })
    };

    // app.get('/api/troop/:id', troopRoutes.get);
    self.get = function (req, res) {
        troopModel.get(req.params.id, function (err, result) {
            res.json({err : err, data : result});
        })
    };

    // app.post('/api/troop', troopRoutes.save);
    self.save = function (req, res) {
        troopModel.save(req.body, function (err, result) {
            res.json({err : err, data : result});
        });
    };

}

module.exports = new TroopRoutes();
