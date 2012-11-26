$(function() {
    ko.numericObservable = function(initialValue) {
        var actual = ko.observable(initialValue);

        var result = ko.dependentObservable({
                read: function() {
                    return actual();
                },
                write: function(newValue) {
                    var parsed = parseFloat(newValue);
                    actual(isNaN(parsed) ? newValue : parsed);
                }
            });

        return result;
    };
});