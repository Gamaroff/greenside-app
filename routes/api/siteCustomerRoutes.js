var model = require('../../domain/postgres/models/siteCustomer');

function SiteCustomer() {
    'use strict';

	var self = this;

	// app.get('/api/sitecustomer/:id' ..
	self.get = function(req, res) {
		model.get(req.params.id, function(result) {
			res.send({result: result});
		});
	};

	// app.post('/api/sitecustomer' ..
	self.save = function(req, res) {
		model.save(req.body, function(err, result) {
			if (err)
				{res.send({err: err});}
			else
				{res.send({result: result});}
		});
	};

}

module.exports = new SiteCustomer();
