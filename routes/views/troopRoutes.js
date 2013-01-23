var _ = require('underscore');
var viewUtil = require('../../app/viewUtil');

function TroopRoutes() {
    'use strict';

    var self = this;

    // app.get('/troops', troopRoutes.viewTroops);
    self.viewTroops = function (req, res) {
        viewUtil.renderView(req, res, 'troop/troops', 'Troops', 'troop');
    };

    // app.get('/troop/:id', troopRoutes.viewTroop);
    self.viewTroop = function (req, res) {
        viewUtil.renderView(req, res, 'troop/troop', 'Troops', 'troop', {id : req.params.id});
    };

}

module.exports = new TroopRoutes();
