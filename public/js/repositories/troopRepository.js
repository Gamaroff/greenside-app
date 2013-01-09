/**
 * User: gamaroff
 * Date: 2012/11/26
 * Time: 10:29 PM
 */

define(['models/troopModel'],
    function (troopModel) {
        'use strict';

        function TroopRepository() {

            var self = this;

            self.getTroops = function (callback) {
                $.get('/api/troops', function (result) {

                    if (result.data) {
                        var mapped = $.map(result.data, function (troop) {
                            return new troopModel(troop);
                        });
                        callback(null, mapped);
                    }
                    else {
                        callback(null);
                    }
                });
            };

            self.saveTroop = function (troop, callback) {
                $.post('/api/troop', function (result) {
                    callback(result.err, result.data);
                });
            };
        }

        return new TroopRepository();

    });