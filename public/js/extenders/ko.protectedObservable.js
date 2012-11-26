$(function () {
    //wrapper to an observable that requires accept/cancel
    ko.protectedObservable = function (initialValue) {
        //private variables
        var actualValue = ko.observable(initialValue);
        var tempValue = ko.observable(initialValue);

        //dependentObservable that we will return
        var result = ko.computed({
            //always return the actual value
            read: function () {
                return actualValue();
            },
            //stored in a temporary spot until commit
            write: function (value) {
                tempValue(value);
            },
            owner: this
        });

        //if different, commit temp value
        result.commit = function () {
            if (tempValue() !== actualValue()) {
                actualValue(tempValue());
                this.newValue = tempValue();
            }
        };

        result.newValue = function () {
            return tempValue();
        };

        //force subscribers to take original
        result.reset = function () {
            try {
                actualValue().valueHasMutated();
                tempValue(actualValue()); //reset temp value 
            }
            catch(ex){}
        };

        return result;
    };
});