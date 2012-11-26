/**
 * User: gamaroff
 * Date: 2012/07/19
 * Time: 11:30 AM
 */

define(['lib/knockout', 'extenders/knockout.validation'], function (ko) {

    return function LoginViewModel() {

        var self = this;

        self.isBusy = ko.observable(false);

        self.email = ko.observable().extend({ required : true, email : true });
        self.password = ko.observable().extend({ minLength : 6, required : true });
        self.remember = ko.observable();
        self.errorMessage = ko.observable();

        self.isValid = ko.computed(function () {
            var valid = true;

            if (!self.email.isValid())
                valid = false;
            if (!self.password.isValid())
                valid = false;

            return valid;
        });

        self.login = function () {

            self.isBusy(true);
            self.errorMessage(null);

            var dto = {
                email    : self.email(),
                password : self.password()
            };

            $.post('/login', dto, function (err) {
                if (err.err) {
                    self.isBusy(false);

                    if (err.err === 'Activation Required')
                        location.href = '/activation';
                    else
                        self.errorMessage(err.err);
                }
                else {
                    location.href = '/dashboard';
                }
            });

        };

    };

});