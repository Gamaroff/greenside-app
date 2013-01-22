/**
 * User: gamaroff
 * Date: 2012/11/26
 * Time: 10:26 PM
 */

define(['lib/knockout', 'models/troopModel', 'repositories/troopRepository'],
    function (ko, troopModel, troopRepo) {
        'use strict';

        return function TroopsViewModel() {

            var self = this;

            self.isBusy = ko.observable(false);

            self.troops = ko.observableArray();
            self.troop = ko.observable();

            self.saveTroop = function () {
                self.isBusy(true);

                troopRepo.save(self.troop().mapped(), function (err, result) {
                    self.isBusy(false);
                    getAll();
                });
            };

            self.newTroop = function () {
                self.troop(new troopModel());
            };

            var getAll = function () {
                self.isBusy(true);

                troopRepo.getAll(function (err, result) {
                    self.isBusy(false);
                    self.troops(result);
                });
            };

            getAll();

        };

    });