define(['lib/knockout', 'lib/spin'], function (ko) {

    ko.bindingHandlers.spinner = {
        init:function (element, valueAccessor, allBindingsAccessor) {
            var options = {};
            $.extend(options, ko.bindingHandlers.spinner.defaultOptions, ko.utils.unwrapObservable(allBindingsAccessor().spinnerOptions));

            //create the spinner with the appropriate options
            var spinner = new Spinner(options);

            //could do this in the update function, but this gives us easy access to the spinner object (through the closure) without having to store it with the element
            ko.dependentObservable(function () {
                var value = ko.utils.unwrapObservable(valueAccessor());  //this ensures that it depends on the observable value
                if (value) {
                    spinner.spin(element);
                } else if (spinner.el) {   //don't stop first time
                    spinner.stop();
                }
            });
        },
        defaultOptions:{
            lines:10
//            ,
//            length:3,
//            width:3,
//            radius:5,
//            color:'#000',
//            speed:1,
//            trail:75,
//            shadow:true
        }
    };

});