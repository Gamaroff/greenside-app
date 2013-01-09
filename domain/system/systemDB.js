var CONFIG = require('config').Postgres;
var pg = require('pg');
var orm = require("orm");

var userModel = require('./models/user');
var roleModel = require('./models/role');
var userRoleModel = require('./models/userRole');
var troopModel = require('./models/troop');

function SystemDB() {
    'use strict';

    var self = this;

    self.init = function () {

        var connection_string = 'postgresql://' + CONFIG.username + ':' + CONFIG.password +
            '@' + CONFIG.host + ':' + CONFIG.port + '/' + CONFIG.dbName;

        orm.connect(connection_string, function (err, db) {
            if (err) {
                console.log("Could not connect to PostgresSQL!");
                return;
            }
            else {
                console.log("Connected to PostgresSQL!");

                var role = roleModel.init(db);
                var user = userModel.init(db, role);

                var userRole = userRoleModel.init(db, user, role);
                var troop = troopModel.init(db);
            }

        });

    };
}

module.exports = new SystemDB();
