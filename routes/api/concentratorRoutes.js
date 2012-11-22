var concentratorModel = require('../../domain/postgres/models/concentrator');

function ConcentratorRoutes() {
    'use strict';

    var self = this;

    // app.post('/api/concentrator' ..
    self.save = function (req, res) {
        concentratorModel.save(req.body, function (err, result) {
            if (err)
                {res.send({err:err});}
            else
               { res.send({result:result});}
        });
    };

    // app.get('/api/concentrators/:id' ..
    self.getAll = function (req, res) {

        if (req.params.id) {
            concentratorModel.getAll(req.params.id, function (result) {
                res.json({result:result});
            });
        }
        else
           { res.json({err:'Concentrators are not available'});}
    };

    // app.get('/api/concentrators/withmeters/:id' ..
    self.getAllWithMeters = function (req, res) {

        if (req.params.id) {
            concentratorModel.getAllWithMeters(req.params.id, function (result) {
                res.json({result:result});
            });
        }
        else
           { res.json({err:'Concentrators are not available'});}
    };
}

module.exports = new ConcentratorRoutes();
