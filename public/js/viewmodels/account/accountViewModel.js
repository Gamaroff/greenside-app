/**
 * User: gamaroff
 * Date: 2012/07/17
 * Time: 3:48 PM
 */
define(['lib/knockout', 'repository/UserRepository',
    'models/UserModel', 'viewmodels/Api/ApiKeyViewModel',
    'extenders/knockout.validation'],
    function (ko, userRepo, userModel, apiKeyViewModel) {
        'use strict';

        return function AccountViewModel() {

            var self = this;

            self.isBusy = ko.observable(false);
            self.user = ko.observable(new userModel());
            self.apiKeys = ko.observable(new apiKeyViewModel());

            self.loadUser = function () {

                self.isBusy(true);

                userRepo.get(function (err, user) {
                    self.isBusy(false);

                    if (user) {
                        self.user(user);
                    }
                });

            };

            self.saveUser = function () {

                self.isBusy(true);

                var dto = self.user().mapped();

                userRepo.save(dto, function (err, result) {
                    self.isBusy(false);
                    if (err) {
                        alert(err);
                    }
                    else {
                        alert('User Saved');
                    }
                });

            };

            self.loadUser();

        };

    });