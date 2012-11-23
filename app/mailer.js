/**
 * User: gamaroff
 * Date: 2012/07/02
 * Time: 10:24 PM
 */
var nodemailer = require('nodemailer');
var CONFIG = require('config').Email;

function Mailer() {
    'use strict';

    var self = this;

// create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport('SMTP', {
        service : CONFIG.service,
        auth    : {
            user : CONFIG.user,
            pass : CONFIG.password
        }
    });

    self.sendMail = function (to, subject, html) {


        // setup e-mail data with unicode symbols
        var mailOptions = {
            from    : 'Scouter <' + CONFIG.user + '>', // sender address
            to      : to, // list of receivers
            subject : subject, // Subject line
            html    : html // html body
        };

        // send mail with defined transport object
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                //console.log(error);
            }
            else {
                // console.log('Message sent: ' + response.message);
            }

            // if you don't want to use this transport object anymore, uncomment following line
            //smtpTransport.close(); // shut down the connection pool, no more messages
        });

    };

}

module.exports = new Mailer();