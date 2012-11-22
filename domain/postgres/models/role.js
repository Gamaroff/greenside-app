function RoleModel() {
    "use strict";

    var self = this;

    var Model = null;

    self.init = function (db) {

        Model = db.define('role', {
            'name'        : {'type' : 'string' },
            'description' : {'type' : 'string' }
        });

        return Model;
    };

    var buildModel = function (obj) {

        return new Model({
            name        : obj.name,
            description : obj.description
        });
    };

    self.getAll = function (callback) {
        Model.find(function (result) {
            if (result) {
                callback(result);
            }
            else {
                callback(null);
            }
        });
    };

    self.get = function (role, callback) {

        var query = {id : [parseInt(role, 10)] };

        if (isNaN(role)) {
            query = { name : [role] };
        }

        Model.find(query, function (result) {
            if (result) {
                callback(result[0]);
            }
            else {
                callback(null);
            }
        });

    };

    self.save = function (obj, callback) {

        var m = buildModel(obj);

        if (obj.id) {
            m.id = obj.id;
        }

        m.save(function (err, result) {

            if (err) {
                callback(err);
            }
            else {
                callback(null, result);
            }
        });
    };
}

module.exports = new RoleModel();
