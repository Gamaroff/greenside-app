var paymentModel = require('../../domain/postgres/models/payment');

function PaymentRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/payment/:id', paymentRoutes.get);
    self.get = function (req, res) {
        paymentModel.get(req.params.id, function (result) {
            res.json({result : result});
        });
    };

    // app.get('/api/payment/invoice/:invoice', paymentRoutes.getForInvoice);
    self.getForInvoice = function (req, res) {
        paymentModel.getForInvoice(req.params.invoice, function (result) {
            res.json({result : result});
        });
    };

    // app.get('/api/payment/customer/:customer', paymentRoutes.getForCustomer);
    self.getForCustomer = function (req, res) {
        paymentModel.getForCustomer(req.params.customer, function (result) {
            res.json({result : result});
        });
    };

    // app.get('/api/payment/meter/:meter', paymentRoutes.getForMeter);
    self.getForMeter = function (req, res) {
        paymentModel.getForMeter(req.params.meter, function (result) {
            res.json({result : result});

        });
    };

    // app.post('/api/payment', paymentRoutes.save);
    self.save = function (req, res) {
        paymentModel.save(req.body, function (err, result) {
            res.json({err: err, result : result});
        });
    };

}

module.exports = new PaymentRoutes();
