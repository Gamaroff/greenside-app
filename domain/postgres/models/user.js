var bcrypt = require('bcrypt');
var mailer = require('../../../app/mailer');
var _ = require('underscore');
var userRoleModel = require('./userRole');
var roleModel = require('./role');

function User() {
    'use strict';

    var self = this;

    var Model = null;

    self.init = function (db, roleModel) {

        Model = db.define('user', {
            first_name         : { "type" : "string" },
            last_name          : { "type" : "string" },
            email              : { "type" : "string" },
            salt               : { "type" : "string" },
            hash               : { "type" : "string" },
            created            : { "type" : "date" },
            mobile             : { "type" : "string" },
            phone              : { "type" : "string" },
            fax                : { "type" : "string" },
            address_line1      : { "type" : "string" },
            address_line2      : { "type" : "string" },
            city               : { "type" : "string" },
            postal_code        : { "type" : "string" },
            province           : { "type" : "string" },
            country            : { "type" : "string" },
            skype              : { "type" : "string" },
            gtalk              : { "type" : "string" },
            twitter            : { "type" : "string" },
            facebook           : { "type" : "string" },
            website            : { "type" : "string" },
            linkedin           : { "type" : "string" },
            bill_address_line1 : { "type" : "string" },
            bill_address_line2 : { "type" : "string" },
            bill_city          : { "type" : "string" },
            bill_postal_code   : { "type" : "string" },
            bill_province      : { "type" : "string" },
            bill_country       : { "type" : "string" },
            active             : { "type" : "boolean" },
            activated          : { "type" : "boolean" },
            activation_code    : { "type" : "string" },
            picture            : { "type" : "data" }
        });

        Model.hasMany("roles", roleModel, "role", { autoFetch : true, collection : 'user_role' });

        return Model;
    };

    var buildModel = function (obj) {

        return new Model({
            first_name         : obj.first_name,
            last_name          : obj.last_name,
            email              : obj.email,
            salt               : obj.salt,
            hash               : obj.hash,
            created            : obj.created,
            mobile             : obj.mobile,
            phone              : obj.phone,
            fax                : obj.fax,
            address_line1      : obj.address_line1,
            address_line2      : obj.address_line2,
            city               : obj.city,
            postal_code        : obj.postal_code,
            province           : obj.province,
            country            : obj.country,
            skype              : obj.skype,
            gtalk              : obj.gtalk,
            twitter            : obj.twitter,
            facebook           : obj.facebook,
            website            : obj.website,
            linkedin           : obj.linkedin,
            bill_address_line1 : obj.bill_address_line1,
            bill_address_line2 : obj.bill_address_line2,
            bill_city          : obj.bill_city,
            bill_postal_code   : obj.bill_postal_code,
            bill_province      : obj.bill_province,
            bill_country       : obj.bill_country,
            active             : obj.active,
            activated          : obj.activated,
            activation_code    : obj.activation_code,
            picture            : obj.picture
        });
    };

    self.get = function (user, callback) {

        var query = {id : [user]};

        if (isNaN(user)) {
            query = {email : [user.toLowerCase()]};
        }

        Model.find(query, function (result) {
            if (result) {
                callback(result[0]);
            }
            else {
                callback(null);
            }
        });
    };

    self.getUsers = function (users, callback) {

        Model.find({id : users}, function (result) {
            if (result) {
                callback(result);
            }
            else {
                callback(null);
            }
        });
    };

    self.getUserToActivate = function (email, activationCode, callback) {

        Model.find({email : [email], activation_code : [activationCode]}, function (result) {
            if (result) {

                var user = result[0];

                if (user.activated) {
                    callback('User is already activated', {canActivate : false});
                }
                else {
                    callback(null, {canActivate : true, hash : user.hash, email : email});
                }
            }
            else {
                callback('No user exists', {canActivate : false});
            }
        });

    };

    self.save = function (obj, callback) {

        self.get(obj.email.toLowerCase(), function (result) {
            if (!result) {
                if (!obj.password) {
                    obj.password = generateString(6);
                }

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(obj.password, salt);

                obj.salt = salt;
                obj.hash = hash;
                obj.activation_code = generateString(15);
                obj.activated = false;

                delete obj.password;

                Model
                    .create(obj)
                    .success(function (result) {
                        var subject = 'Welcome to Invirohub';
                        var html = '<p>Hello</p>' +
                            '<p>Your registration is complete. To activate your account please go to the following link: </p>' +
                            '<p><a href=\'http://invirohub.com/activate/' + obj.email + '/' + obj.activation_code + '\'>Activate my account</a></p>' +
                            '<p>Your username is: ' + result.email + '</p>' +
                            '<p>Regards,</p><p>Invirohub</p>';
                        mailer.sendMail(result.email, subject, html);

                        callback(null, result);
                    })
                    .error(function (error) {
                        callback(error.message);
                    });

            }
            else {
                self.update(obj, function (err, result) {
                    callback(err, result);
                });
            }
        });

    };

    self.assignRole = function (obj, callback) {
        roleModel.get(obj.role, function (role) {
            if (role) {

                var roleDto = {
                    user_id : obj.user_id,
                    role_id : role.id
                };

                userRoleModel.save(roleDto, function (err, result) {
                    callback(err, result);
                });

            }
            else {
                callback('No role found');
            }
        });
    };

    self.update = function (obj, callback) {

        Model.find({
            email : [obj.email.toLowerCase()]
        }, function (result) {

            if (result) {

                var user = buildModel(obj);

                var returnedUser = result[0];

                // these values won't be changed in the update
                user.id = returnedUser.id;
                user.hash = returnedUser.hash;
                user.salt = returnedUser.salt;
                user.id = returnedUser.id;
                user.email = returnedUser.email;
                user.created_date = returnedUser.created_date;
                user.activated = returnedUser.activated;
                user.activation_code = returnedUser.activation_code;

                user.save(function (err, updatedUser) {
                    if (err) {
                        callback(err);
                    }
                    else {

                        // remove existing role
                        userRoleModel.removeAllUserRoles(updatedUser.id, function (err, result) {
                            _.each(obj.roles, function (role) {

                                var dto = {
                                    user_id : updatedUser.id,
                                    role_id : role.id
                                };

                                userRoleModel.save(dto, function (err, result) {

                                });
                            });

                            callback(null, updatedUser);
                        });
                    }
                });
            }
            else {
                callback('No user found');
            }
        });
    };

    self.changePassword = function (obj, callback) {

        Model.find({
            email : [obj.email.toLowerCase()]
        }, function (result) {
            if (result) {

                var returnedUser = result[0];

                if (returnedUser.hash === obj.hash) {
                    var user = buildModel(returnedUser);
                    user.id = returnedUser.id;

                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(obj.password, salt);

                    user.salt = salt;
                    user.hash = hash;
                    user.activated = true;

                    user.save(function (err, result) {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback(null, result);
                        }
                    });
                }
                else {
                    callback('Password not changed');
                }
            }
            else {
                callback('No user exists');
            }
        });
    };

    self.authenticate = function (email, password, callback) {

        self.get(email.toLowerCase(), function (user) {

            if (!user) {
                return callback('User with that Username/Email does not exist');
            }
            else {

                verifyPassword(password, user.hash, function (err, passwordCorrect) {
                    if (err) {
                        return callback('An error occurred: ' + err);
                    }
                    if (!passwordCorrect) {
                        return callback('Incorrect Username/Password');
                    }
                    return callback(null, user);
                });
            }
        });
    };

    var verifyPassword = function (password, hash, callback) {
        // passwordHash method
        // callback(null, passwordHash.verify(password, hash));

        // bcrypt method
        bcrypt.compare(password, hash, callback);
    };

    function generateString(len) {
        len = parseInt(len, 10);
        if (!len) {
            len = 6;
        }
        var generatedString = "";
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var charsN = chars.length;
        var nextChar;

        for (var i = 0; i < len; i++) {
            nextChar = chars.charAt(Math.floor(Math.random() * charsN));
            generatedString += nextChar;
        }
        return generatedString;
    }

}

module.exports = new User();
