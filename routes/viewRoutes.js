var auth = require('../app/auth');
var homeRoutes = require('./views/homeRoutes');
var accountRoutes = require('./views/accountRoutes');
var dashboardRoutes = require('./views/dashboardRoutes');
var troopRoutes = require('./views/troopRoutes');

function ViewRoutes() {
    'use strict';

    var self = this;

    self.init = function (app) {

        app.get('/', homeRoutes.viewIndex);

        app.get('/dashboard', auth.ensureAuthenticated, dashboardRoutes.view);

        app.post('/login', accountRoutes.doLogin);
        app.post('/register', accountRoutes.register);
        app.get('/register', accountRoutes.viewRegister);
        app.get('/activate/:email/:id', accountRoutes.viewActivate);
        app.get('/activated', accountRoutes.viewActivated);
        app.get('/activation', accountRoutes.viewActivation);
        app.post('/api/changepassword', auth.ensureAuthenticated, accountRoutes.changePassword);

        app.get('/troops', auth.ensureAuthenticated, troopRoutes.viewTroops);
        app.get('/troop/:id', auth.ensureAuthenticated, troopRoutes.viewTroop);

    };

}

module.exports = new ViewRoutes();
