var shipmentModel = require('../../domain/postgres/models/shipment');
var shipmentItemModel = require('../../domain/postgres/models/shipmentItem');

function ShipmentRoutes() {
    'use strict';

    var self = this;



    // app.post('/api/shipment' ..
    self.save = function (req, res) {
        shipmentModel.save(req.body, function (err, result) {
            if (err) {
                res.send({err:err});
            }
            else {
                res.send({result:result});
            }
        });
    };

    // app.get('/api/shipments/:id', shipmentRoutes.getForUtility);
    self.getForUtility = function (req, res) {

        shipmentModel.getForUtility(req.params.id, function (result) {
            res.json({result:result});
        });

    };

    // app.get('/api/shipments/:id' ..
    self.get = function (req, res) {

        if (req.params.id) {
            shipmentModel.get(req.params.id, function (result) {
                res.json({result:result});
            });
        }
        else {
            res.json({err:'Shipment is not available'});
        }
    };

    // app.get('/api/shipments/:id' ..
    self.getItems = function (req, res) {

        if (req.params.id) {
            shipmentItemModel.getAll(req.params.id, function (result) {
                res.json({result:result});
            });
        }
        else {
            res.json({err:'Shipment Items are not available'});
        }
    };
}

module.exports = new ShipmentRoutes();
