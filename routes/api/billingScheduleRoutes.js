var model = require('../../domain/postgres/models/billingSchedule');

function BillingSchedules() {
    'use strict';

    var self = this;



    // app.get('/api/billingschedules/:id'
    self.getAll = function (req, res) {

        if (req.params.id) {
            model.getAll(req.params.id, function (result) {
                res.json({result:result});
            });
        }
        else
           { res.json({err:'Sites are not available'});}

    };

    // app.post('/api/billingschedules' ..
    self.save = function (req, res) {

        model.save(req.body, function (err, result) {
            if (err)
                {res.json({err:err});}
            else
                {res.json({result:result});}
        });
    };





}


module.exports = new BillingSchedules();
