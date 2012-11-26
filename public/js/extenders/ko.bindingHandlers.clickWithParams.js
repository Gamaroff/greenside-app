

define(['lib/knockout'], function(ko){
    ko.bindingHandlers.clickWithParams = {
        init: function(element, valueAccessor, allBindingsAccessor, context) {
            var options = valueAccessor();
            var newValueAccessor = function() {
                return function() {
                    options.action.apply(context, options.params);
                };
            };
            ko.bindingHandlers.click.init(element, newValueAccessor, allBindingsAccessor, context);
        }
    };
});


/*
usage: 
<a href="#" data-bind="clickWithParams: { action: $item.select, params: [ $data ] }">select</a>

*/