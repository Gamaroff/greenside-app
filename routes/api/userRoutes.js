var userModel = require('../../domain/postgres/models/user');
var roleModel = require('../../domain/postgres/models/role');

function User() {
    'use strict';

    var self = this;

    // app.get('/api/user/:id', userRoutes.get);
    self.get = function (req, res) {

        userModel.get(req.params.user, function (result) {

            if (result) {
                res.send({result : result});
            }
            else {
                res.send({err : 'No user found'});
            }
        });

    };


    // app.post('/api/user'...)
    self.save = function (req, res) {

        if (req.body.id) { // update
            userModel.update(req.body, function (err, result) {
                if (err) {
                    res.send({err : err});
                }
                else {
                    res.send({err : null, result : result});
                }
            });
        }
        else { // save new
            userModel.save(req.body, function (err, result) {
                if (err) {
                    res.send({err : err});
                }
                else {
                    res.send({err : null, result : result});
                }
            });
        }

    };

    // app.get('/api/roles' ..
    self.getRoles = function (req, res) {

        roleModel.getAll(function (result) {

            if (result) {
                res.send({result : result});
            }
            else {
                res.send({err : 'No user found'});
            }
        });

    };

}

module.exports = new User();

