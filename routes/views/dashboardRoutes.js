var viewUtil = require('../../app/viewUtil');

function DashboardRoutes() {
    'use strict';

    var self = this;

    // app.get('/dashboard', homeRoutes.view);
    self.view = function (req, res) {
        viewUtil.renderView(req, res, 'dashboard/dashboard', 'Dashboard', 'dashboard');
    };

}

module.exports = new DashboardRoutes();