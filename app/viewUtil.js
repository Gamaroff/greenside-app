/**
 * User: gamaroff
 * Date: 2012/09/18
 * Time: 4:38 PM
 */
var _ = require('underscore');

function ViewUtil() {
    'use strict';

    var self = this;

    self.addRoleProperties = function (params, roles) {

        if (!params.roles) {
            params.roles = [];
        }

        _.each(roles, function (role) {
            params.roles.push('is' + role.description.replace(/ /g, ''));
        });
    };

    self.renderView = function (req, res, path, title, area, params, permissionRoles) {

        var hasPermission = false;

        if (!permissionRoles) {
            hasPermission = true;
        }
        else {
            _.each(permissionRoles, function (permissionRole) {
                if (_.find(req.user.roles, function (role) {
                   return role.name === permissionRole;
                })) {
                    hasPermission = true;
                }
            });
        }

        if (!hasPermission) {
            res.render('home/index.jade', {
                title:'Scouter',
                roles:[],
                currentUser:req.user,
                ngapp:'',
                area:''
            });
        }
        else {
            var data = {
                title:title,
                currentUser:req.user,
                ngapp:'',
                area:area
            };

            if (params) {
                for (var property in params) {
                    data[property] = params[property];
                }
            }

            if (req.user) {
                self.addRoleProperties(data, req.user.roles);
            }

            res.render(path + '.jade', data);
        }
    };

}

module.exports = new ViewUtil();