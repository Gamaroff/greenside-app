var userModel = require('../../domain/postgres/models/user');
var _ = require('underscore');

function AccountRoutes() {
    'use strict';

    var self = this;

    self.changePassword = function (req, res) {
        if (req.body) {
            userModel.changePassword(req.body, function (err, result) {
                res.send({err:err, result:result});
            });
        }
    };
}

module.exports = new AccountRoutes();
