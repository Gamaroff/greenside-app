/**
 * User: gamaroff
 * Date: 2012/11/26
 * Time: 10:26 PM
 */

define(['lib/knockout', 'repositories/troopRepository'],
    function (ko, troopRepo) {
        'use strict';

        return function TroopViewModel(id) {

            var self = this;

            self.isBusy = ko.observable(false);

            self.troop = ko.observable();

            var loadTroop = function () {
                self.isBusy(true);

                troopRepo.get(id, function (err, result) {
                    self.isBusy(false);

                    if (result) {
                        self.troop(result);
                    }
                });
            };

            loadTroop();

        };

    });