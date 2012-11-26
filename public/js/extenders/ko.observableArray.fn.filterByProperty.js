define(['lib/knockout'], function (ko) {
    ko.observableArray.fn.filterByProperty = function (propName, matchValue, match) {
        return ko.computed(function () {
            var allItems = this(), matchingItems = [];
            for (var i = 0; i < allItems.length; i++) {
                var current = allItems[i];

                if (match) {
                    if (ko.utils.unwrapObservable(current[propName]) === matchValue)
                        matchingItems.push(current);
                }
                else {
                    if (ko.utils.unwrapObservable(current[propName]) !== matchValue)
                        matchingItems.push(current);
                }
            }
            return matchingItems;
        }, this);
    };
});