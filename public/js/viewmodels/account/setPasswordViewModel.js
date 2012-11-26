/**
 * User: gamaroff
 * Date: 2012/08/24
 * Time: 10:04 AM
 */

define(['lib/knockout', 'extenders/knockout.validation'], function (ko) {
    'use strict';

    return function SetPasswordViewModel(email, hash) {

        var self = this;

        self.isBusy = ko.observable(false);

        self.email = ko.observable(email);

        self.password = ko.observable().extend({ minLength : 6, required : true });
        self.confirmPassword = ko.observable().extend({ required : true, equal : {params : self.password, message : 'Confirm password must match Password'} });
        self.errorMessage = ko.observable();

        self.isValid = ko.computed(function () {
            var valid = true;

            if (!self.password.isValid())
                valid = false;
            if (!self.confirmPassword.isValid())
                valid = false;

            if (!valid) {
                self.errorMessage('Ensure that all required fields are entered and correct');
            }
            else {
                self.errorMessage(null);
            }

            return valid;
        });

        self.setPassword = function () {

            self.isBusy(true);
            self.errorMessage(null);

            var dto = {
                email    : self.email(),
                password : self.password(),
                hash     : hash
            };

            $.post('/api/changepassword', dto, function (err) {

                if (err.err) {
                    self.isBusy(false);
                    self.errorMessage(err.err);
                }
                else {
                    location.href = '/activated';
                }
            });

        };

    };

});