var siteUserModel = require('../../domain/postgres/models/siteUser');
var userModel = require('../../domain/postgres/models/user');

function SiteUsers() {
    'use strict';

    var self = this;


    // app.get('/api/siteusers' ..
    self.getAll = function (req, res) {
        siteUserModel.getAll(req.params.id, function (result) {
            res.send(result);
        });
    };

    // app.post('/api/siteusers' ..
    self.save = function (req, res) {

        if (req.body.id) { // updating

            // change req.body.id to user_id
            var userToSave = req.body;
            userToSave.id = req.body.user_id;

            userModel.update(userToSave, function (err, result) {
                if (err) {
                    res.send({err:err});
                }
                else {
                    res.send({result:result});
                }
            });
        }
        else { // adding

            // first add a user

            userModel.save(req.body, function (err, userResult) {

                if (err) {
                    res.send({err:err});
                }
                else {

                    // get current users site_id
                    siteUserModel.getByUser(req.user.id, function (siteUser) {

                        if (siteUser) {
                            siteUserModel.save(userResult.id, siteUser.site_id, function (err, siteUserResult) {
                                if (err) {
                                    res.send({err:err});
                                }
                                else {
                                    res.send({result:siteUserResult});
                                }
                            });
                        }

                    });
                }

            });
        }
    };

}


module.exports = new SiteUsers();
