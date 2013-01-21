var troopModel = require('../../domain/system/models/troop');
var _ = require('underscore');

function TroopRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/troops', troopRoutes.getTroops);
    self.getTroops = function (req, res) {
        troopModel.getTroops(function (err, result) {
            res.json({err : err, data : result});
        })
    };

    // app.get('/api/troop/:id', troopRoutes.getTroop);
    self.getTroop = function (req, res) {
        troopModel.getTroop(function (err, result) {
            res.json({err : err, data : result});
        })
    };

    // app.post('/api/troop', troopRoutes.saveTroop);
    self.saveTroop = function (req, res) {
        troopModel.saveTroop(function (err, result) {
            res.json({err : err, data : result});
        })
    };

}

module.exports = new TroopRoutes();
