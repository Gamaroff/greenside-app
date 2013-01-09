var auth = require('../app/auth');

var troopRoutes = require('./api/troopRoutes');

function ApiRoutes() {
    'use strict';

    var self = this;

    self.init = function (app) {

        app.get('/api/troops', troopRoutes.getTroops);
        app.get('/api/troop/:id', troopRoutes.getTroop);
        app.post('/api/troop', troopRoutes.saveTroop);

    };

}

module.exports = new ApiRoutes();
