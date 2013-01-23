var _ = require('underscore');

function Troop() {
    'use strict';

    var self = this;

    var Model = null;

    self.init = function (db) {

        Model = db.define('troop', {
            name               : String,
            email              : String,
            created            : Date,
            mobile             : String,
            phone              : String,
            fax                : String,
            address_line1      : String,
            address_line2      : String,
            city               : String,
            postal_code        : String,
            province           : String,
            country            : String,
            skype              : String,
            gtalk              : String,
            twitter            : String,
            facebook           : String,
            website            : String,
            linkedin           : String,
            bill_address_line1 : String,
            bill_address_line2 : String,
            bill_city          : String,
            bill_postal_code   : String,
            bill_province      : String,
            bill_country       : String,
            active             : Boolean,
            picture            : String
        });

        return Model;
    };

    var buildModel = function (obj) {

        var dto = {};

        for (var property in obj) {
            dto[property] = obj[property];
        }
        return new Model(dto);
    };

    self.get = function (id, callback) {

        Model.get(id, function (err, result) {
            callback(err, result);
        });
    };

    self.getAll = function (callback) {

        Model.find({}, function (err, result) {
            callback(err, result);
        });
    };

    self.save = function (obj, callback) {

        var m = buildModel(obj);

        m.save(function (err, result) {
            callback(err, result);
        });
    };

}

module.exports = new Troop();
