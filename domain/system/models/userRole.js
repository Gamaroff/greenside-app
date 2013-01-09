var _ = require('underscore');

function UserRolesModel() {
    'use strict';

    var self = this;

    var Model = null;

    self.init = function (db, userModel, roleModel) {

        Model = db.define('user_role', {
            role_id : Number,
            user_id : Number
        });

        Model.hasOne("role", roleModel, { autoFetch : true });
        Model.hasOne("user", userModel, { autoFetch : true });

        return Model;
    };

    var buildModel = function (obj) {

        return new Model({
            role_id : obj.role_id,
            user_id : obj.user_id
        });
    };

    self.get = function (id, callback) {
        Model.find({
            id : [parseInt(id, 10)]
        }, function (result) {

            if (result) {
                callback(result[0]);
            }
            else {
                callback(null);
            }
        });
    };

    self.remove = function (userId, roleId, callback) {

        Model.find({
            user_id : [ parseInt(userId, 10) ],
            role_id : [ parseInt(roleId, 10) ]
        }, function (result) {
            if (result) {

                var item = result[0];

                item.remove(function (result) {
                    callback(result);
                });
            }
            else {
                callback(null);
            }
        });

    };

    self.removeAllUserRoles = function (userId, callback) {

        Model.find({
            user_id : [ parseInt(userId, 10) ]
        }, function (result) {

            _.each(result, function (userRole) {
                userRole.remove(function (result) {

                });
            });

            callback(null, true);

        });

    };

    self.save = function (obj, callback) {

        self.get(parseInt(obj.role_id, 10), parseInt(obj.user_id, 10), function (result) {

            if (!result) {
                Model
                    .create(obj)
                    .success(function (result) {
                        callback(null, result);
                    })
                    .error(function (error) {
                        callback(error.message);
                    });
            }

        });

    };
}

module.exports = new UserRolesModel();
