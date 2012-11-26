/* Usage:
<div data-bind="template: { name: 'editTmpl', data: selectedItem }, dialog: { open: selectedItem, accept: accept, cancel: cancel, position: lastClicked, dimensions: {width: 100, height: 100} }">
</div>
*/




$(function () {

    ko.bindingHandlers.dialog = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var options = ko.utils.extend(value.options || {}, ko.bindingHandlers.dialog.defaultOptions);

            //setup our buttons
            options.buttons = {
                "Accept": value.accept.bind(viewModel, viewModel),
                "Cancel": value.cancel.bind(viewModel, viewModel)
            };

            options.buttons = [
                {
                    id: "accept",
                    text: "Accept",
                    click: value.accept.bind(viewModel, viewModel)
                    // disabled: true
                },
                {
                    id: "cancel",
                    text: "Cancel",
                    click: value.cancel.bind(viewModel, viewModel),
                    disabled: false
                }
            ];


            $(element).dialog(options);

            if (value.dimensions) {
                var width = value.dimensions.width;
                var height = value.dimensions.height;
                $(element).dialog("option", "width", width);
                $(element).dialog("option", "height", height);
            }

            if (value.position) {
                var target = value.position();
                if (target) {
                    var pos = $(target).position();
                    $(element).dialog("option", "position", [pos.left + $(target).width(), pos.top + $(target).height()]);
                }
            }
           
            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).dialog("destroy");
            });


        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            $(element).dialog(ko.utils.unwrapObservable(value.open) ? "open" : "close");

           //  var disableAccept = false;
          //  if (value.isValid != undefined)
          //      disableAccept = !value.isValid();

            //            var buttons = $(element).dialog("option", "buttons");
            //            $.each(buttons, function (i, button) {
            //                if (button.id == 'accept') {
            //                    button.disabled = disableAccept;
            //                }
            //            });


        },
        defaultOptions: {
            autoOpen: false,
            resizable: false,
            modal: true
        }
    };



});