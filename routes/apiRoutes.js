var auth = require('../app/auth');

var accountRoutes = require('./api/accountRoutes');

function ApiRoutes() {
    'use strict';

    var self = this;

    self.init = function (app) {

        app.post('/api/changepassword', accountRoutes.changePassword);

        app.post('/login', accountRoutes.doLogin);

        app.post('/register', accountRoutes.register);

    };

}

module.exports = new ApiRoutes();
