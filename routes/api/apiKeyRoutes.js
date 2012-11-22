var apiKeyModel = require('../../domain/postgres/models/apiKey');

function ApiKeyRoutes() {
    'use strict';

    var self = this;

    // app.get('/api/keys' ..
    self.getAll = function (req, res) {

        if (req.user.id) {
            apiKeyModel.getAll(req.user.id, function (result) {
                res.json({result:result});
            });
        }
        else {
            res.json({err:'API Keys are not available'});
        }

    };

    // app.post('/api/key' ..
    self.generate = function (req, res) {

        apiKeyModel.generate(req.user.id, function (err, result) {
            if (err) {
                res.json({err:err});
            }
            else {
                res.json({result:result});
            }
        });
    };
}

module.exports = new ApiKeyRoutes();
