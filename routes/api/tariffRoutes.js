var tariffModel = require('../../domain/postgres/models/tariff');

function Tariffs() {
    'use strict';

    var self = this;

    // app.get('/api/tariffs/:id', tariffRoutes.getForUtility);
    self.getForUtility = function (req, res) {
        tariffModel.getForUtility(req.params.id, function (tariffs) {
            res.send({result:tariffs});
        });
    };

    // app.get('/api/tariff/:id' ..
    self.get = function (req, res) {
        tariffModel.get(req.params.id, function (err, result) {
            if (err) {
                res.send({err:err});
            }
            else {
                res.send({result:result});
            }
        });
    };

    // app.post('/api/tariffs' ..
    self.save = function (req, res) {

        if (req.user.id) {

            if (req.body.id) { // updating
                tariffModel.update(req.body, function (err, result) {
                    if (err) {
                        res.send({err:err});
                    }
                    else {
                        res.send({result:result});
                    }
                });
            }
            else { // new

                tariffModel.save(req.body, function (err, result) {
                    if (err) {
                        res.send({err:err});
                    }
                    else {
                        res.send({result:result});
                    }
                });

            }
        }
        else {
            res.send('Not authenticated');
        }
    };


}

module.exports = new Tariffs();
