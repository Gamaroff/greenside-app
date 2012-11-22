var invoiceModel = require('../../domain/postgres/models/invoice');

function InvoiceRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/invoice/:id', invoiceRoutes.get);
    self.get = function (req, res) {
        invoiceModel.get(req.params.id, function (result) {
            res.json({result : result});
        });
    };

    // app.get('/api/invoice/number/:number', invoiceRoutes.getForNumber);
    self.getForNumber = function (req, res) {
        invoiceModel.getForNumber(req.params.number, function (result) {
            res.json({result : result});
        });
    };

    // app.get('/api/invoice/customer/:customer', invoiceRoutes.getForCustomer);
    self.getForCustomer = function (req, res) {
        invoiceModel.getForCustomer(req.params.customer, function (result) {
            res.json({result : result});
        });
    };

    // app.get('/api/invoice/meter/:meter', invoiceRoutes.getForMeter);
    self.getForMeter = function (req, res) {
        invoiceModel.getForMeter(req.params.meter, function (result) {
            res.json({result : result});

        });
    };

    // app.post('/api/invoice', invoiceRoutes.save);
    self.save = function (req, res) {
        invoiceModel.save(req.body, function (err, result) {
            res.json({err: err, result : result});
        });
    };

}

module.exports = new InvoiceRoutes();
