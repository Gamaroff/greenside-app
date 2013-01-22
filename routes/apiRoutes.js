var auth = require('../app/auth');

var troopRoutes = require('./api/troopRoutes');

function ApiRoutes() {
    'use strict';

    var self = this;

    self.init = function (app) {

        app.get('/api/troops', troopRoutes.getAll);
        app.get('/api/troop/:id', troopRoutes.get);
        app.post('/api/troop', troopRoutes.save);

    };

}

module.exports = new ApiRoutes();
