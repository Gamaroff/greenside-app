var auth = require('../app/auth');
var homeRoutes = require('./views/homeRoutes');
var accountRoutes = require('./views/accountRoutes');

function ViewRoutes() {
    'use strict';

    var self = this;

    self.init = function (app) {

        app.get('/', homeRoutes.viewIndex);

        app.get('/register', accountRoutes.viewRegister);

    };

}

module.exports = new ViewRoutes();
