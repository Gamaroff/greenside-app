var CONFIG = require('config').Postgres;
var pg = require('pg');
var orm = require("orm");

var userModel = require('./models/user');
var roleModel = require('./models/role');
var userRoleModel = require('./models/userRole');

function Postgres() {
    'use strict';

    var self = this;

    self.init = function () {

        var connection_string = 'pg://' + CONFIG.username + ':' + CONFIG.password +
            '@' + CONFIG.host + ':' + CONFIG.port + '/' + CONFIG.dbName;

        orm.connect(connection_string, function (success, db) {
            if (!success) {
                console.log("Could not connect to PostgresSQL!");
                return;
            }
            console.log("Connected to PostgresSQL!");

            var role = roleModel.init(db);
            var user = userModel.init(db, role);

            var userRole = userRoleModel.init(db, user, role);

        });

    };
}

module.exports = new Postgres();
