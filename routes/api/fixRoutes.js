var deviceModel = require('../../domain/postgres/models/device');
var redis = require('../../domain/redis/redisDevices');
var _ = require('underscore');

function Fix() {
    'use strict';

    var self = this;

    // app.post('/fixredis/:siteid' ..
    self.fixDevices = function (req, res) {

        redis.removeDevices(req.params.siteid, function () {

            deviceModel.getAll(req.params.siteid, function (devices) {

                _.each(devices, function (device) {

                    var deviceIndex = device.device_id.substr(device.device_id.length - 2, 2);
                    device.mac_address = device.device_id.substr(0, device.device_id.length - 2);

                    try {
                        device.device_id = parseInt(device.mac_address, 16) + deviceIndex;

                        // add the device manually to redis because the device is being updated and not added
                        redis.addDevice(device.site_id, device.device_id, device.date_time_offset);

                        deviceModel.save(device, function(err, result){

                        });
                    }
                    catch (err) {
                    }
                });

                res.send({result:'done'});

            });

        });
    };

}

module.exports = new Fix();
