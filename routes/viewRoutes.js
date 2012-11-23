var auth = require('../app/auth');
var homeRoutes = require('./views/homeRoutes');
var accountRoutes = require('./views/accountRoutes');

function ViewRoutes() {
    'use strict';

    var self = this;

    self.init = function (app) {

        app.get('/', homeRoutes.viewIndex);

        app.get('/register', accountRoutes.viewRegister);

        app.get('/activate/:email/:id', accountRoutes.viewActivate);
        app.get('/activated', accountRoutes.viewActivated);
        app.get('/activation', accountRoutes.viewActivation);

    };

}

module.exports = new ViewRoutes();
