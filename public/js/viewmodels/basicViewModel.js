/**
 * User: gamaroff
 * Date: 2012/07/19
 * Time: 11:30 AM
 */

define(['lib/knockout'], function (ko) {
    'use strict';

    return function BasicViewModel() {

        var self = this;

        self.isBusy = ko.observable(false);

    };

});