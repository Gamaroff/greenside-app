var viewUtil = require('../../app/viewUtil');

function HomeRoutes() {
    'use strict';

    var self = this;

    // app.get('/', homeRoutes.viewIndex);
    self.viewIndex = function (req, res) {
        viewUtil.renderView(req, res, 'home/index', 'Home', 'home');
    };



}

module.exports = new HomeRoutes();