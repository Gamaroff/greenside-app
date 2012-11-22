define(function () {
        'use strict';

        function Tools() {

            var self = this;

            self.isNullOrEmpty = function (item) {
                return item ? true : false;
            };

            self.getUrlParameter = function () {
                var url = document.URL;
                var i = url.lastIndexOf("/");

                var param;
                if (i == url.length - 1) {
                    url = url.substr(0, i)
                    i = url.lastIndexOf("/");
                }

                param = url.substr(i + 1);

                return param;

            };

            self.ISODateString = function (d) {
                function pad(n) {
                    return n < 10 ? '0' + n : n;
                }

                return d.getUTCFullYear() + '-'
                    + pad(d.getUTCMonth() + 1) + '-'
                    + pad(d.getUTCDate()) + 'T'
                    + pad(d.getUTCHours()) + ':'
                    + pad(d.getUTCMinutes()) + ':'
                    + pad(d.getUTCSeconds()) + 'Z';
            };

            self.UnixDate = function (date) {

                var theDate = new Date(date);
                var theTime = theDate.getTime();
                var offset = theDate.getTimezoneOffset() * 60;

                return Math.round(((theTime) / 1000));
            };

            self.FormatOffset = function (offset) {

                // build offset to have
                // GMT+12:00
                // GMT
                // structure

                if (!offset) {
                    return 'GMT'; // default to GMT if no offset
                }

                var offsetString = offset.toString();
                if (offsetString === '0') {
                    offsetString = 'GMT';
                }
                else {

                    if (offsetString.indexOf('-') !== -1) {
                        offsetString = offsetString.replace('-', '');
                        if (offsetString.length === 1) {
                            offsetString = '0' + offsetString;
                        }

                        offsetString = 'GMT-' + offsetString + ':00';
                    }
                    else {
                        if (offsetString.length === 1) {
                            offsetString = '0' + offsetString;
                        }

                        offsetString = 'GMT+' + offsetString + ':00';
                    }
                }

                return offsetString;
            };

            self.OffsetToInt = function (offsetString) {

                // clean the offset of GMT and :00
                // GMT+12:00
                // GMT

                if (offsetString) {

                    var offset = offsetString;
                    offset = offset.replace('GMT', '');
                    if (offset.length == 0) {
                        offset = 0;
                    }
                    else {
                        offset = offset.replace(':00', '').replace("+", '');
                    }

                    return parseInt(offset);
                }
                else {
                    return 0;
                }
            };

            self.emptyOrDefault = function (value, isNumber) {

                if (value)
                    return value;
                else {
                    if (isNumber)
                        return 0;
                    else
                        return '';
                }

            };

            self.trim = function (value) {

                return value ? $.trim(value) : undefined;

            };
        }

        return new Tools();

    }

)
;