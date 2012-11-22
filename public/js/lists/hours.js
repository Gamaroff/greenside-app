/**
 * User: gamaroff
 * Date: 2012/08/14
 * Time: 10:38 AM
 */


define(function () {

    var items = [];

    for (var i = 0; i < 24; i++) {

        var description = i;

        if (i < 10) {
            description = '0' + i;
        }

        items.push({
            id:i,
            description:description
        });
    }

    return items;

});


