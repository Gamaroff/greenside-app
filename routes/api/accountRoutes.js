var userModel = require('../../domain/postgres/models/user');
var _ = require('underscore');

function AccountRoutes() {
    'use strict';

    var self = this;

    self.changePassword = function (req, res) {
        if (req.body) {
            userModel.changePassword(req.body, function (err, result) {
                res.send({err : err, data : result});
            });
        }
    };

    // app.post('/register', accountRoutes.register);
    self.register = function (req, res) {

        var newUser = {
            email : req.body.email
        };

        userModel.save(newUser, function (err, result) {
            res.send({err : err, data : result});
        });

    };
}

module.exports = new AccountRoutes();
