/**
 * User: gamaroff
 * Date: 2012/11/26
 * Time: 10:32 PM
 */

define(['lib/knockout',
    'extenders/knockout.validation'],
    function (ko) {
        'use strict';

        return function TroopModel(data) {
            var self = this;

            data = data || {};

            self.isBusy = ko.observable(false);
            self.isEditing = ko.observable(false);

            self.id = ko.observable(data.id);
            self.name = ko.observable(data.name).extend({required : true});
            self.addressLine1 = ko.observable(data.address_line1);
            self.addressLine2 = ko.observable(data.address_line2);
            self.city = ko.observable(data.city);
            self.postalCode = ko.observable(data.postal_code);
            self.province = ko.observable(data.province);
            self.country = ko.observable(data.country);
            self.phone = ko.observable(data.phone);
            self.fax = ko.observable(data.fax);
            self.email = ko.observable(data.email);
            self.facebook = ko.observable(data.facebook);
            self.twitter = ko.observable(data.twitter);
            self.web = ko.observable(data.web);
            self.picture = ko.observable(data.picture);

            self.edit = function () {
                self.isEditing(true);
            };

            self.cancel = function () {
                self.isEditing(false);
            };

            self.mapped = function () {

                return {
                    id            : self.id(),
                    name          : self.name(),
                    address_line1 : self.addressLine1(),
                    address_line2 : self.addressLine2(),
                    city          : self.city(),
                    postal_code   : self.postalCode(),
                    province      : self.province(),
                    country       : self.country(),
                    phone         : self.phone(),
                    fax           : self.fax(),
                    email         : self.email(),
                    facebook      : self.facebook(),
                    twitter       : self.twitter(),
                    web           : self.web(),
                    picture       : self.picture()
                };
            };

            self.isValid = ko.computed(function () {
                var valid = true;

                if (!self.name.isValid()) {
                    valid = false;
                }

                return valid;
            });

        };

    });