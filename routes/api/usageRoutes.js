/**
 * User: gamaroff
 * Date: 2012/07/05
 * Time: 9:33 PM
 */
var utilityUsageModel = require('../../domain/mongo/models/utilityUsage');
var siteUsageModel = require('../../domain/mongo/models/siteUsage');
var deviceUsageModel = require('../../domain/mongo/models/deviceUsage');

var siteUserModel = require('../../domain/postgres/models/siteUser');
var utilityModel = require('../../domain/postgres/models/utility');
var siteModel = require('../../domain/postgres/models/site');

var deviceModel = require('../../domain/postgres/models/device');
var _ = require('underscore');
var csvConverter = require('../../app/csvConverter');
var moment = require('moment');

function Usage() {
    'use strict';

    var self = this;

    var UTILITY_DATA = [
        {name:'fromstamp', description:'Date', date:'LLL'},
        {name:'utility_name', description:'Utility'},
        {name:'watts', description:'Watts'},
        {name:'spotkwh', description:'Spot kWh'},
        {name:'temp', description:'Temperature'},
        {name:'kwh', description:'kWh'},
        {name:'volt', description:'Volts'},
        {name:'ghg', description:'Greenhouse Gas'},
        {name:'maxdemand', description:'Max Demand'},
        {name:'kva', description:'kVa'},
        {name:'amps', description:'Amps'},
        {name:'freq', description:'Frequency'},
        {name:'kvar', description:'kVar'},
        {name:'pf', description:'Power Factor'},
        {name:'kw', description:'kW'}
    ];

    var SITE_DATA = [
        {name:'fromstamp', description:'Date', date:'LLL'},
        {name:'utility_name', description:'Utility'},
        {name:'site_name', description:'Site'},
        {name:'watts', description:'Watts'},
        {name:'spotkwh', description:'Spot kWh'},
        {name:'temp', description:'Temperature'},
        {name:'kwh', description:'kWh'},
        {name:'volt', description:'Volts'},
        {name:'ghg', description:'Greenhouse Gas'},
        {name:'maxdemand', description:'Max Demand'},
        {name:'kva', description:'kVa'},
        {name:'amps', description:'Amps'},
        {name:'freq', description:'Frequency'},
        {name:'kvar', description:'kVar'},
        {name:'pf', description:'Power Factor'},
        {name:'kw', description:'kW'}
    ];

    var DEVICE_DATA = [
        {name:'fromstamp', description:'Date', date:'LLL'},
        {name:'utility_name', description:'Utility'},
        {name:'site_name', description:'Site'},
        {name:'device_name', description:'Device'},
        {name:'watts', description:'Watts'},
        {name:'spotkwh', description:'Spot kWh'},
        {name:'temp', description:'Temperature'},
        {name:'kwh', description:'kWh'},
        {name:'volt', description:'Volts'},
        {name:'ghg', description:'Greenhouse Gas'},
        {name:'maxdemand', description:'Max Demand'},
        {name:'kva', description:'kVa'},
        {name:'amps', description:'Amps'},
        {name:'freq', description:'Frequency'},
        {name:'kvar', description:'kVar'},
        {name:'pf', description:'Power Factor'},
        {name:'kw', description:'kW'}
    ];

    var processCsv = function (res, data, fields, title) {

        var csv = csvConverter.parse({
            data:data,
            fields:fields
        });

        res.header('content-type', 'text/csv');
        res.header('content-disposition', 'attachment; filename=' + title + '.csv');
        res.write(csv);
        res.end('');
    };

    var processSiteReports = function (res, siteId, records, reportName) {
        siteModel.get(siteId, function (site) {
            var data = JSON.parse(JSON.stringify(records));

            _.each(data, function (usage) {
                usage.site_name = site.name;
                usage.utility_name = site.utility.name;
            });

            processCsv(res, data, SITE_DATA, reportName);
        });
    };

    var processSitesReports = function (res, sites, records, reportName) {
        siteModel.getSites(sites, function (result) {

            var siteLookup = [];

            _.each(result, function (site) {
                siteLookup[site.id] = {site:site.name, utility:site.utility.name};
            });

            var data = JSON.parse(JSON.stringify(records));

            _.each(data, function (usage) {

                if (siteLookup[usage.siteid]) {
                    usage.site_name = siteLookup[usage.siteid].site;
                    usage.utility_name = siteLookup[usage.siteid].utility;
                }
                else {
                    usage.site_name = 'Unknown';
                    usage.utility_name = 'Unknown';
                }

            });

            processCsv(res, data, SITE_DATA, reportName);
        });
    };

    var processDeviceReports = function (res, sites, records, reportName) {
        deviceModel.getForSites(sites, function (devices) {

            var deviceLookup = [];

            _.each(devices, function (d) {
                deviceLookup[d.device_id] = {device:d.name, site:d.site.name, utility:d.site.utility.name};
            });

            var data = JSON.parse(JSON.stringify(records));

            _.each(data, function (usage) {

                if (deviceLookup[usage.deviceid]) {
                    usage.device_name = deviceLookup[usage.deviceid].device;
                    usage.site_name = deviceLookup[usage.deviceid].site;
                    usage.utility_name = deviceLookup[usage.deviceid].utility;
                }
                else {
                    usage.device_name = 'Unknown';
                    usage.site_name = 'Unknown';
                    usage.utility_name = 'Unknown';
                }
            });

            processCsv(res, data, DEVICE_DATA, reportName);
        });
    };

    //region Utility

    self.getUtilityHourlyUsage = function (req, res) {

        utilityUsageModel.getUtilityHourlyUsage(req.params.id, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {

                utilityModel.get(req.params.siteId, function (utility) {
                    var data = JSON.parse(JSON.stringify(result));

                    _.each(data, function (usage) {
                        usage.utility_name = utility.name;
                    });

                    processCsv(res, data, UTILITY_DATA, 'UtilityHourlyUsage');
                });

            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getUtilityDailyUsage = function (req, res) {

        utilityUsageModel.getUtilityDailyUsage(req.params.id, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {

                utilityModel.get(req.params.siteId, function (utility) {
                    var data = JSON.parse(JSON.stringify(result));

                    _.each(data, function (usage) {
                        usage.utility_name = utility.name;
                    });

                    processCsv(res, data, UTILITY_DATA, 'UtilityDailyUsage');
                });
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getUtilityMonthlyUsage = function (req, res) {

        utilityUsageModel.getUtilityMonthlyUsage(req.params.id, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                utilityModel.get(req.params.siteId, function (utility) {
                    var data = JSON.parse(JSON.stringify(result));

                    _.each(data, function (usage) {
                        usage.utility_name = utility.name;
                    });

                    processCsv(res, data, UTILITY_DATA, 'UtilityMonthlyUsage');
                });
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getUtilityYearlyUsage = function (req, res) {

        utilityUsageModel.getUtilityYearlyUsage(req.params.id, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                utilityModel.get(req.params.siteId, function (utility) {
                    var data = JSON.parse(JSON.stringify(result));

                    _.each(data, function (usage) {
                        usage.utility_name = utility.name;
                    });

                    processCsv(res, data, UTILITY_DATA, 'UtilityYearlyUsage');
                });
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getUtilityUsageSummary = function (req, res) {

        utilityUsageModel.getUtilityUsageSummary(req.params.id, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processCsv(res, result, UTILITY_DATA, 'UtilityUsageSummary');
            }
            else {
                res.send({result:result});
            }
        });
    };

    //endregion

    //region Individual Site

    self.getSiteHourlyUsage = function (req, res) {

        siteUsageModel.getSiteHourlyUsage(req.params.siteId, req.params.start, req.params.end, function (err, result) {

            if (req.query.report === 'true') {
                processSiteReports(res, req.params.siteId, result, 'SiteHourlyUsage');
            }
            else {
                res.send({result:result});
            }

        });

    };

    self.getSiteDailyUsage = function (req, res) {

        siteUsageModel.getSiteDailyUsage(req.params.siteId, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processSiteReports(res, req.params.siteId, result, 'SiteDailyUsage');
            }
            else {
                res.send({result:result});
            }
        });

    };

    self.getSiteMonthlyUsage = function (req, res) {

        siteUsageModel.getSiteMonthlyUsage(req.params.siteId, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processSiteReports(res, req.params.siteId, result, 'SiteMonthlyUsage');
            }
            else {
                res.send({result:result});
            }
        });

    };

    self.getSiteYearlyUsage = function (req, res) {

        siteUsageModel.getSiteYearlyUsage(req.params.siteId, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processSiteReports(res, req.params.siteId, result, 'SiteYearlyUsage');
            }
            else {
                res.send({result:result});
            }
        });

    };

    // /api/usage/site/summary/:id/:start/:end
    self.getSiteUsageSummary = function (req, res) {

        siteUsageModel.getSiteUsageSummary(req.params.id, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                siteModel.get(req.params.id, function (site) {
                    var data = JSON.parse(JSON.stringify(result));

                    _.each(data, function (usage) {
                        usage.site_name = site.name;
                        usage.utility_name = site.utility.name;
                    });

                    processCsv(res, result, SITE_DATA, 'SiteUsageSummary');
                });
            }
            else {
                res.send({result:result});
            }
        });

    };

    //endregion

    //region Utility Sites

    self.getUtilitySitesHourlyUsage = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        siteUsageModel.getUtilitySitesHourlyUsage(req.params.utilityId, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processCsv(res, result, SITE_DATA, 'UtilitySitesHourlyUsage');
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getUtilitySitesDailyUsage = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        siteUsageModel.getUtilitySitesDailyUsage(req.params.utilityId, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processCsv(res, result, SITE_DATA, 'UtilitySitesDailyUsage');
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getUtilitySitesMonthlyUsage = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        siteUsageModel.getUtilitySitesMonthlyUsage(req.params.utilityId, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processCsv(res, result, SITE_DATA, 'UtilitySitesMonthlyUsage');
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getUtilitySitesYearlyUsage = function (req, res) {

        // need to get the utc offset of the site and add it to the start and end

        siteUsageModel.getUtilitySitesYearlyUsage(req.params.utilityId, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processCsv(res, result, SITE_DATA, 'UtilitySitesYearlyUsage');
            }
            else {
                res.send({result:result});
            }
        });
    };

    //endregion

    //region Sites

    // /api/usage/sites/summary/:id/:start/:end
    self.getSitesUsageSummary = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        if (!siteArray) {
            res.send({err:'No sites were specified'});
        }
        else {
            siteUsageModel.getSitesUsageSummary(siteArray, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processCsv(res, result, SITE_DATA, 'SitesUsageSummary');
                }
                else {
                    res.send({result:result});
                }
            });
        }
    };

    self.getSitesHourlyUsage = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        if (!siteArray) {
            res.send({err:'No sites were specified'});
        }
        else {
            siteUsageModel.getSitesHourlyUsage(siteArray, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {

                    processSitesReports(res, siteArray, result, 'SitesHourlyUsage');

                }
                else {
                    res.send({result:result});
                }
            });
        }
    };

    self.getSitesDailyUsage = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        if (!siteArray) {
            res.send({err:'No sites were specified'});
        }
        else {
            siteUsageModel.getSitesDailyUsage(siteArray, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processSitesReports(res, siteArray, result, 'SitesDailyUsage');
                }
                else {
                    res.send({result:result});
                }
            });
        }
    };

    self.getSitesMonthlyUsage = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        if (!siteArray) {
            res.send({err:'No sites were specified'});
        }
        else {
            siteUsageModel.getSitesMonthlyUsage(siteArray, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processSitesReports(res, siteArray, result, 'SitesMonthlyUsage');
                }
                else {
                    res.send({result:result});
                }
            });
        }
    };

    self.getSitesYearlyUsage = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        if (!siteArray) {
            res.send({err:'No sites were specified'});
        }
        else {
            siteUsageModel.getSitesYearlyUsage(siteArray, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processSitesReports(res, siteArray, result, 'SitesYearlyUsage');
                }
                else {
                    res.send({result:result});
                }
            });
        }
    };

    //endregion

    //region Site User Sites

    self.getSiteUserSitesHourlyUsage = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            // need to get the utc offset of the site and add it to the start and end
            siteUsageModel.getSitesHourlyUsage(siteIds, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processCsv(res, result, SITE_DATA, 'SiteUserSitesHourlyUsage');
                }
                else {
                    res.send({result:result});
                }
            });
        });

    };

    self.getSiteUserSitesDailyUsage = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            // need to get the utc offset of the site and add it to the start and end
            siteUsageModel.getSitesDailyUsage(siteIds, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processCsv(res, result, SITE_DATA, 'SiteUserSitesDailyUsage');
                }
                else {
                    res.send({result:result});
                }
            });
        });
    };

    self.getSiteUserSitesMonthlyUsage = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            // need to get the utc offset of the site and add it to the start and end
            siteUsageModel.getSitesMonthlyUsage(siteIds, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processCsv(res, result, SITE_DATA, 'SiteUserSitesMonthlyUsage');
                }
                else {
                    res.send({result:result});
                }
            });
        });
    };

    self.getSiteUserSitesYearlyUsage = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            // need to get the utc offset of the site and add it to the start and end
            siteUsageModel.getSitesYearlyUsage(siteIds, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processCsv(res, result, SITE_DATA, 'SiteUserSitesYearlyUsage');
                }
                else {
                    res.send({result:result});
                }
            });
        });
    };

    self.getSiteUserSiteUsageSummary = function (req, res) {

        siteUserModel.getSitesForUser(req.user.id, function (results) {

            var siteIds = _.map(results, function (item) {
                return parseInt(item.site_id, 10);
            });

            siteUsageModel.getSitesUsageSummary(siteIds, req.params.start, req.params.end, function (err, result) {
                if (req.query.report === 'true') {
                    processCsv(res, result, SITE_DATA, 'SiteUserSiteUsageSummary');
                }
                else {
                    res.send({result:result});
                }
            });
        });
    };

    //endregion

    //region Devices

    self.getDevicesHourlyUsage = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        deviceUsageModel.getDevicesHourlyUsage(siteArray, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processDeviceReports(res, siteArray, result, 'DevicesHourlyUsage');
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getDevicesDailyUsage = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        deviceUsageModel.getDevicesDailyUsage(siteArray, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processDeviceReports(res, siteArray, result, 'DevicesDailyUsage');
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getDevicesMonthlyUsage = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        deviceUsageModel.getDevicesMonthlyUsage(siteArray, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processDeviceReports(res, siteArray, result, 'DevicesMonthlyUsage');
            }
            else {
                res.send({result:result});
            }
        });
    };

    self.getDevicesYearlyUsage = function (req, res) {

        var siteArray = req.query.sites;

        if (req.params.sites) {
            siteArray = req.params.sites.split(',');
        }

        deviceUsageModel.getDevicesYearlyUsage(siteArray, req.params.start, req.params.end, function (err, result) {
            if (req.query.report === 'true') {
                processDeviceReports(res, siteArray, result, 'DevicesYearlyUsage');
            }
            else {
                res.send({result:result});
            }
        });
    };

    //endregion
}

module.exports = new Usage();
