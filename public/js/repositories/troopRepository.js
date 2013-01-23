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

            self.getAll = function (callback) {
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

            self.save = function (troop, callback) {
                $.post('/api/troop', troop, function (result) {
                    if (result.data) {
                        callback(null, new troopModel(result.data));
                    }
                    else {
                        callback(null);
                    }
                });
            };

            self.get = function (id, callback) {
                $.get('/api/troop/' + id, function (result) {
                    if (result.data) {
                        callback(null, new troopModel(result.data));
                    }
                    else {
                        callback(result.err);
                    }
                });
            };
        }

        return new TroopRepository();

    });