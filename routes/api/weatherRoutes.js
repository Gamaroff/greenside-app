/**
 * User: gamaroff
 * Date: 2012/09/03
 * Time: 4:36 PM
 */
var weatherModel = require('../../domain/postgres/models/weather');
var _ = require('underscore');

function WeatherRoutes() {
    'use strict';

    var self = this;

    //region API

    // app.get('/api/weather' ..
    self.getAll = function (req, res) {

        weatherModel.getAll(function (result) {
            res.json({result:result});
        });

    };

    // app.post('/api/weather' ..
    self.save = function (req, res) {
        weatherModel.save(req.body, function (err, result) {
            if (err) {
                res.send({err:err});
            }
            else {
                res.send({result:result});
            }
        });
    };

    // app.post('/api/weather/remove/:id' ..
    self.remove = function (req, res) {
        weatherModel.remove(req.params.id, function (err, result) {
            if (err) {
                res.send({err:err});
            }
            else {
                res.send({result:result});
            }
        });
    };

    //endregion
}

module.exports = new WeatherRoutes();
