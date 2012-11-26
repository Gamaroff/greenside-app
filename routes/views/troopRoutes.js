var _ = require('underscore');
var viewUtil = require('../../app/viewUtil');

function TroopRoutes() {
    'use strict';

    var self = this;

    // app.get('/troops', troopRoutes.viewTroops);
    self.viewTroops = function (req, res) {
        viewUtil.renderView(req, res, 'troop/troops', 'Troops', 'troop');
    };

}

module.exports = new TroopRoutes();
