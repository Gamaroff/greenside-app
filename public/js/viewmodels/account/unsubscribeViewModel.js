/**
 * User: gamaroff
 * Date: 2012/07/19
 * Time: 11:30 AM
 */

define(['lib/knockout', 'extenders/knockout.validation'], function (ko) {
    'use strict';

    return function RegisterViewModel() {

        var self = this;

        self.isBusy = ko.observable(false);

        self.email = ko.observable().extend({ required:true }).extend({ email:true });
        self.errorMessage = ko.observable();
        self.message = ko.observable();

        self.isValid = ko.computed(function () {
            var valid = true;

            if (!self.email.isValid()) {
                valid = false;
            }

            return valid;
        });

        self.unsubscribe = function () {

            self.isBusy(true);
            self.errorMessage(null);

            location.href = '/unsubscribe/' + self.email();

        };

        self.subscribe = function () {

            self.isBusy(true);
            self.errorMessage(null);

            var dto = {
                email:self.email(),
                subscribe:true
            };

            $.post('/subscribe', dto, function (err) {

                if (err.err) {
                    self.isBusy(false);
                    self.errorMessage(err.err);
                }
                else {
                    self.email('');
                    self.errorMessage(null);
                    self.message('Thank you for subscribing!.');
                }
            });

        };

        self.email.subscribe(function (newValue) {
            self.errorMessage(null);
            self.message(null);
        });

    };

});