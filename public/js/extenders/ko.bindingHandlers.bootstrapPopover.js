/**
 * User: gamaroff
 * Date: 2012/11/10
 * Time: 1:54 PM
 */
define(['lib/knockout'], function (ko) {
    ko.bindingHandlers.bootstrapPopover = {
        init : function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var options = valueAccessor();
            var defaultOptions = {};
            options = $.extend(true, {}, defaultOptions, options);
            $(element).popover(options);
        }
    };
});

/* usage

//  ensure viewmodel has following properties:
var dto = {
    "id"    : 1,
    "title" : "title-1",
    "info"  : "info-1"
};

<table class="table table-condensed" data-bind="foreach: items">
    <tr>
        <td><b data-bind="text: $data.id"></b></td>
        <td data-bind="text: $data.title"></td>
        <td><a href="#" data-bind="bootstrapPopover : {content : $data.info  }">Info</a></td>
    </tr>
</table>

*/