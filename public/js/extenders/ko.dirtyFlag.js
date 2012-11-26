$(function() {
    ko.dirtyFlag = function(root, initiallyDirty) {
        var result = function() { },
            initialState = ko.observable(ko.toJSON(root)),
            isInitiallyDirty = ko.observable(initiallyDirty);

        result.isDirty = ko.dependentObservable(function() {
            return isInitiallyDirty() || initialState() !== ko.toJSON(root);
        });

        result.reset = function() {
            initialState(ko.toJSON(root));
            isInitiallyDirty(false);
        };

        return result;
    };
});