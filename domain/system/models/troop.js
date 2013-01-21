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

        return new Model({
            name          : obj.name,
            email         : obj.email,
            created       : obj.created,
            mobile        : obj.mobile,
            phone         : obj.phone,
            fax           : obj.fax,
            address_line1 : obj.address_line1,
            address_line2 : obj.address_line2,
            city          : obj.city,
            postal_code   : obj.postal_code,
            province      : obj.province,
            country       : obj.country,
            skype         : obj.skype,
            gtalk         : obj.gtalk,
            twitter       : obj.twitter,
            facebook      : obj.facebook,
            website       : obj.website,
            linkedin      : obj.linkedin,
            active        : obj.active,
            picture       : obj.picture
        });
    };

    self.get = function (id, callback) {

        Model.find({id : id}, function (result) {
            if (result) {
                callback(result[0]);
            }
            else {
                callback(null);
            }
        });
    };

}

module.exports = new Troop();
