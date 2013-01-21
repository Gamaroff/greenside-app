/**
 * User: gamaroff
 * Date: 2012/11/26
 * Time: 10:26 PM
 */

define(['lib/knockout', 'models/troopModel'], function (ko, troopModel) {
    'use strict';

    return function TroopsViewModel() {

        var self = this;

        self.isBusy = ko.observable(false);

        self.troops = ko.observableArray();
        self.troop = ko.observable(new troopModel());



    };

});