/*

  self.dateOfBirth = ko.observable(dt).extend({isoDate: 'm/dd/yyyy'});
 */


$(function() {
    ko.extenders.isoDate = function(target, formatString) {
        target.formattedDate = ko.computed({
            read: function() {
                if (!target()) {
                    return;
                }
                var dt = new Date(Date.parse(target()));
                return dt.format(formatString, true);
            },
            write: function(value) {
                if (value) {
                    target(new Date(Date.parse(value)).toISOString());
                }
            }
        });

        //initialize with current value
        target.formattedDate(target());

        //return the computed observable
        return target;
    };
});