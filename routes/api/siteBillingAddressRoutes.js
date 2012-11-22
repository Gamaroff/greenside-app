var model = require('../../domain/postgres/models/siteBillingAddress');

function SiteBillingAddress() {
    'use strict';

    var self = this;

    // app.get('/api/sitebillingaddress/:id' ..
    self.get = function (req, res) {
        model.get(req.params.id, function (result) {
            res.send(result);
        });
    };

    // app.save('/api/sitebillingaddress' ..
    self.save = function (req, res) {
        model.save(req.body, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
            }
        });
    };

}


module.exports = new SiteBillingAddress();
