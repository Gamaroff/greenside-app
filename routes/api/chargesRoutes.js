/**
 * User: gamaroff
 * Date: 2012/07/05
 * Time: 9:33 PM
 */
var site = require('../../domain/mongo/models/siteCharges');
var device = require('../../domain/mongo/models/deviceCharges');
var _ = require('underscore');

var siteUserModel = require('../../domain/postgres/models/siteUser');

var moment = require('moment');

function Charges() {
    'use strict';

    var self = this;

    //region Individual Site

    self.getSiteHourlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        site.getSiteHourlyCharges(req.params.siteId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getSiteDailyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        site.getSiteDailyCharges(req.params.siteId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getSiteMonthlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        site.getSiteMonthlyCharges(req.params.siteId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getSiteYearlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        site.getSiteYearlyCharges(req.params.siteId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    //endregion

    //region Sites

    self.getSitesHourlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        site.getSitesHourlyCharges(req.params.utilityId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getSitesDailyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        site.getSitesDailyCharges(req.params.utilityId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getSitesMonthlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        site.getSitesMonthlyCharges(req.params.utilityId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getSitesYearlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        site.getSitesYearlyCharges(req.params.utilityId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    //endregion

    //region Site User Sites

    self.getSiteUserSitesHourlyCharges = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            // need to get the utc offset of the site and add it to the start and end
            site.getSiteUserSitesHourlyCharges(siteIds, req.params.start, req.params.end, function (result) {
                res.send({result:result});
            });
        });

    };

    self.getSiteUserSitesDailyCharges = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            // need to get the utc offset of the site and add it to the start and end
            site.getSiteUserSitesDailyCharges(siteIds, req.params.start, req.params.end, function (result) {
                res.send({result:result});
            });
        });
    };

    self.getSiteUserSitesMonthlyCharges = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            // need to get the utc offset of the site and add it to the start and end
            site.getSiteUserSitesMonthlyCharges(siteIds, req.params.start, req.params.end, function (result) {
                res.send({result:result});
            });
        });
    };

    self.getSiteUserSitesYearlyCharges = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            // need to get the utc offset of the site and add it to the start and end
            site.getSiteUserSitesYearlyCharges(siteIds, req.params.start, req.params.end, function (result) {
                res.send({result:result});
            });
        });
    };

    //endregion

    //region Devices

    self.getDevicesHourlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        device.getDevicesHourlyCharges(req.params.siteId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getDevicesDailyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        device.getDevicesDailyCharges(req.params.siteId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getDevicesMonthlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        device.getDevicesMonthlyCharges(req.params.siteId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    self.getDevicesYearlyCharges = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        device.getDevicesYearlyCharges(req.params.siteId, req.params.start, req.params.end, function (result) {
            res.send({result:result});
        });
    };

    //endregion
}

module.exports = new Charges();
