$(function() {


    //custom binding to initialize a jQuery UI button
    ko.bindingHandlers.jqButton = {
        init: function (element, valueAccessor) {
            var options = ko.utils.unwrapObservable(valueAccessor()) || {};

            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).button("destroy");
            });

            $(element).button(options);
        }
    };
});

