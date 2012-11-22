var auth = require('../app/auth');
var homeRoutes = require('./views/homeRoutes');

function ViewRoutes() {
    'use strict';

    var self = this;

    self.init = function (app) {

        app.get('/', homeRoutes.viewIndex);

    };

}

module.exports = new ViewRoutes();
